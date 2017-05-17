const Metalsmith  = require('metalsmith')
const handlebars = require('handlebars')
const cheerio = require('cheerio')

const markdown    = require('metalsmith-markdown')
const layouts     = require('metalsmith-layouts')
const permalinks  = require('metalsmith-permalinks')
const collect     = require('metalsmith-auto-collections')
const debug       = require('metalsmith-debug')
const changed     = require('metalsmith-changed')
const livereload  = require('metalsmith-livereload')
const cleanCSS    = require('metalsmith-clean-css')
const ancestry    = require('metalsmith-ancestry')
const links       = require('metalsmith-relative-links')
const hbtmd       = require('metalsmith-hbt-md')
const sass        = require('metalsmith-sass')
const linkcheck   = require('metalsmith-linkcheck')
const hljs        = require('metalsmith-metallic')
const inlineSVG   = require('metalsmith-inline-svg')
const compress    = require('metalsmith-gzip')
const optipng     = require('metalsmith-optipng')
const sitemap     = require('metalsmith-sitemap')
const htmlMin     = require('metalsmith-html-minifier')
const logger      = require('./logger')
const metatoc     = require('./metatoc')
const languageTab = require('./language-tab')
const algolia     = require('./algolia')
const clickImage  = require('./clickable-images')
const saveSrc     = require('./save-src')

const nodeStatic = require('node-static')
const watch = require('glob-watcher')
const open = require('open')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

let port = 8080
if (process.argv.indexOf('--port') > -1) {
  port = parseInt(process.argv[process.argv.indexOf('--port') + 1])
}

let watchEnabled = false
if (process.argv.indexOf('--watch') > -1) {
  watchEnabled = true
}

const algoliaProjectID = '4RFBRWISJR'
const algoliaPublicKey = '6febf1ebe906bd82bce58d5a20ac6c1b'
const algoliaIndex = 'kuzzle-documentation'

let algoliaPrivateKey
if (process.argv.indexOf('--algolia-private-key') > -1) {
  algoliaPrivateKey = process.argv[process.argv.indexOf('--algolia-private-key') + 1]
}

// let algoliaFileParser = false
const algoliaFileParser = (file, data) => {
  let objects = []
  let $ = cheerio.load(data.contents.toString(), {
    normalizeWhitespace: true
  })
  let content = $('.main-content')

  // remove useless content
  $('.hljs', content).remove()
  $('blockquote', content).remove()
  $('.language-tab-selector', content).remove()
  $('h1, h2, h3, h4, h5, h6', content).remove()

  objects.push({
    objectID: data.path,
    title: data.title,
    description: data.description ? data.description : '',
    path: data.path,
    content: content.text(),
    parent: (data.ancestry.parent ? data.ancestry.parent.title : ''),
    firstMember: (data.ancestry.firstMember ? data.ancestry.firstMember.title : ''),
    toc: data.toc
  })

  return objects;
}

/**
 * Usefull handlebars helpers
 */
handlebars.registerHelper({
  not: function(v) {
    return !v
  },
  eq: function (v1, v2) {
    return v1 === v2
  },
  ne: function (v1, v2) {
    return v1 !== v2
  },
  lt: function (v1, v2) {
    return v1 < v2
  },
  gt: function (v1, v2) {
    return v1 > v2
  },
  lte: function (v1, v2) {
    return v1 <= v2
  },
  gte: function (v1, v2) {
    return v1 >= v2
  },
  and: function (v1, v2) {
    return v1 && v2
  },
  or: function (v1, v2) {
    return v1 || v2
  },
  startwith: function (str, substr) {
    return str.startsWith(substr)
  },
  endswith: function (str, substr) {
    return str.endsWith(substr)
  },
  firstDefinedOf: function (...args) {
    return args.find(a => a)
  },
  dateToISO: function(d) {
    if (d instanceof Date) {
      return d.toISOString()
    }

    return d
  }
})

// Build site with metalsmith.
const build = (watch = false) => (done) => {
  let metalsmith = Metalsmith(__dirname)
    .metadata({
      site_title: "Kuzzle documentation",
      site_url: "http://docs.kuzzle.io/",
      gh_repo: "kuzzleio/documentation",
      gh_branch: "rcx-refactor-doc",
      algolia_projectId: algoliaProjectID,
      algolia_publicKey: algoliaPublicKey
    })
    .source('./src')
    .destination('./build') // does not work with 'dist' folder ...
    .clean(true)
    .use(saveSrc())
    .use((files, metalsmith, done) => {
      setImmediate(done);

      Object.keys(files).forEach(path => {
        if (path.endsWith('.md') && files[path].order === undefined) {
          files[path].order = Number.MAX_SAFE_INTEGER
        }
      })
    })

  console.log('== Building site in ' + (watch ? 'watch-dev' : 'prod') + ' mode ==');

  if (watch) {
    metalsmith.use(changed())
  }

  metalsmith
    .use(links())
    .use(ancestry({
      match: '**/*.md',
      sortBy: ['order', 'title']
    }))
    .use(sass({
      sourceMap: true,
      sourceMapContents: true
    }))
    .use(cleanCSS({
      files: 'assets/stylesheets/**/*.css',
      cleanCSS: {
        rebase: true
      }
    }))
    .use(hljs())
    .use(hbtmd(handlebars, {
        pattern: '**/*.md'
    }))
    .use(markdown())
    // .use(collect({
    //   pattern: ['**/*.md']
    // }))
    .use(permalinks())
    .use(metatoc())
    .use(languageTab())
    .use(layouts({
      engine: 'handlebars',
      partials: 'partials',
      exposeConsolidate (r) {
        r.handlebars = handlebars
      }
    }))
    .use(clickImage())
    .use(logger())

  if (watch) {
    metalsmith
      .use(debug())
      .use(livereload({ debug: false, delay: 500 }))
  }

  if (process.argv.indexOf('--gzip') > -1) {
    metalsmith
      .use(inlineSVG())
      .use(optipng({
        pattern: '**/*.png',
        options: ['-o7']
      }))
      .use(linkcheck({
        verbose: true,
        timeout: 5,
        checkFile: '.linkcheck/.links_checked.json',
        ignoreFile: '.linkcheck/links_ignore.json',
        failFile: '.linkcheck/links_failed.json'
      }))
      .use(htmlMin())
      .use(compress())
      .use(sitemap({
        hostname: 'http://docs.kuzzle.io',
        modifiedProperty: 'stats.mtime',
        omitIndex: true
      }))
  }

  if (algoliaPrivateKey) {
    metalsmith
      .use(algolia({
        clearIndex: true,
        projectId: algoliaProjectID,
        privateKey: algoliaPrivateKey,
        index: algoliaIndex,
        fileParser: algoliaFileParser
      }))
  }

  metalsmith.build((error, files) => {
    console.log('==== Build finished ====');

      if (error) {
        console.error(error)
        if (!dev) {
          return done(error)
        }
      }
      done()
    })
}

if (process.argv.indexOf('--dev') > -1) {
  // run dev server (build & serv ./build directory on 8080 port & watch => rebuild on change)
  var serve = new nodeStatic.Server(__dirname + '/build')
  let cache = {}

  require('http').createServer((req, res) => {
    // let header = req.headers['accept-encoding']
    // let acceptsGzip = Boolean(header && /gzip/i.test(header))
    // let file = '/build' + req.url
    // let gziped = false
    //
    // if (file.endsWith('/')) {
    //   file = file + 'index.html'
    // }
    //
    // if (file.indexOf('?') > -1) {
    //   file = file.substring(0, file.indexOf('?'))
    // }
    // console.log(file)
    //
    // if (acceptsGzip && fs.existsSync(__dirname + file + '.gz')) {
    //   if (cache[file + '.gz']) {
    //     console.log('cache:' + file + '.gz')
    //     for (let header in cache[file + '.gz'].headers) {
    //       res.setHeader(header, cache[file + '.gz'].headers[header])
    //     }
    //     res.writeHead(200)
    //     res.write(cache[file + '.gz'].content)
    //     res.end()
    //
    //     return
    //   }
    //
    //   let headers = {
    //     'content-encoding': 'gzip',
    //     'content-type':  mime.contentType(path.extname(__dirname + file))
    //   }
    //
    //   for (let header in headers) {
    //     res.setHeader(header, headers[header])
    //   }
    //   res.writeHead(200)
    //
    //   let pageCache = {
    //     headers,
    //     content: Buffer.from([])
    //   }
    //
    //   fs.createReadStream(__dirname + file + '.gz')
    //     .on('data', chunk => {
    //       res.write(chunk)
    //
    //       pageCache.content = Buffer.concat([pageCache.content, chunk]);
    //     })
    //     .on('end', () => {
    //       res.end()
    //       cache[file + '.gz'] = pageCache
    //     })
    // }
    // else if (fs.existsSync(__dirname + file)) {
    //   if (cache[file]) {
    //     console.log('cache:' + file)
    //     for (let header in cache[file].headers) {
    //       res.setHeader(header, cache[file].headers[header])
    //     }
    //     res.writeHead(200)
    //     res.write(cache[file].content)
    //     res.end()
    //
    //     return
    //   }
    //
    //   let headers = {
    //     'content-type':  mime.contentType(path.extname(__dirname + file))
    //   }
    //
    //   for (let header in headers) {
    //     res.setHeader(header, headers[header])
    //   }
    //   res.writeHead(200)
    //
    //   let pageCache = {
    //     headers,
    //     content: Buffer.from([])
    //   }
    //
    //   fs.createReadStream(__dirname + file)
    //     .on('data', chunk => {
    //       res.write(chunk)
    //
    //       pageCache.content = Buffer.concat([pageCache.content, chunk]);
    //     })
    //     .on('end', () => {
    //       res.end()
    //       cache[file] = pageCache
    //     })
    // }
    // else {
    //   console.log('404!', file)
    //   res.writeHead(404)
    //   res.end('404 =(')
    // }

    req.addListener('end', () => serve.serve(req, res))
    req.resume()
  }).listen(port)

  if (watchEnabled) {
    watch(__dirname + '/{src,layouts,partials}/**/*', { ignoreInitial: false, queue: false }, build(true))
  }
  else {
    build(false)((error) => {
      if (error) {
        console.error(error)
      }
    })
  }

  if (process.argv.indexOf('--open') > -1) {
    open('http://localhost:' + port)
  }
} else {
  // only build static site
  build()((error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    }

    return process.exit(0)
  })
}
