const Metalsmith  = require('metalsmith')
const handlebars  = require('handlebars')
const cheerio     = require('cheerio')
const stripTags   = require('striptags')
const wordCount   = require('wordcount')

const markdown    = require('metalsmith-markdown')
const layouts     = require('metalsmith-layouts')
const permalinks  = require('metalsmith-permalinks')
const collect     = require('metalsmith-auto-collections')
const debug       = require('metalsmith-debug')
const changed     = require('metalsmith-changed')
const livereload  = require('metalsmith-livereload')
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
const logger      = require('./metalsmith-plugins/logger')
const metatoc     = require('./metalsmith-plugins/metatoc')
const languageTab = require('./metalsmith-plugins/language-tab')
const algolia     = require('./metalsmith-plugins/algolia')
const clickImage  = require('./metalsmith-plugins/clickable-images')
const saveSrc     = require('./metalsmith-plugins/save-src')

const nodeStatic = require('node-static')
const watch = require('glob-watcher')
const open = require('open')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

const versionsConfig = require('./versions.config.json')

let options = {
  dev: {
    enabled: false,
    port: 8080,
    openBrowser: false,
    watch: false
  },
  build: {
    compress: false,
    checkLinks: false,
    host: '',
    path: '/'
  },
  algolia: {
    projectId: '4RFBRWISJR',
    index: '',
    publicKey: '6febf1ebe906bd82bce58d5a20ac6c1b',
    privateKey: undefined,
    fnFileParser: undefined
  },
  github: {
    repository: '',
    branch: ''
  }
}

if (process.argv.indexOf('--dev') > -1) {
  options.dev.enabled = true
}

if (process.argv.indexOf('--open-browser') > -1) {
  options.dev.openBrowser = true
}

if (process.argv.indexOf('--port') > -1) {
  options.dev.port = parseInt(process.argv[process.argv.indexOf('--port') + 1])
}

if (process.argv.indexOf('--watch') > -1) {
  options.dev.watch = true
}

if (process.argv.indexOf('--ckeck-links') > -1) {
  options.build.checkLinks = true
}

if (process.argv.indexOf('--build-compress') > -1) {
  options.build.compress = true
}

if (process.argv.indexOf('--build-path') > -1) {
  options.build.path = process.argv[process.argv.indexOf('--build-path') + 1]
}

if (process.argv.indexOf('--build-host') > -1) {
  options.build.host = process.argv[process.argv.indexOf('--build-host') + 1]
}

if (process.argv.indexOf('--algolia-private-key') > -1) {
  options.algolia.privateKey = process.argv[process.argv.indexOf('--algolia-private-key') + 1]
}


for (let config of versionsConfig) {
  if (config.version_path === options.build.path) {
    console.log(`= predefined version ${config.version_label} =`);

    options.github.repository = config.version_gh_repo
    options.github.branch = config.version_gh_branch
    options.algolia.index = config.algolia_index
  }
}


options.algolia.fnFileParser = (file, data) => {
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
  },
  wordsToTime: function(context) {
    // It seems that 75 words per minute is a fair value for technical material
    return Math.ceil(wordCount(stripTags(context.data.root.contents)) / 75)
  },
  since: version => `<p class="since">Since Kuzzle v${version}</p>`,
  deprecated: version => `<p class="deprecated">Deprecated since Kuzzle v${version}. This feature should not be used.</p>`
})

// Build site with metalsmith.
const build = done => {
  let metalsmith = Metalsmith(__dirname)
    .metadata({
      site_title: "Kuzzle documentation",
      site_url: options.build.host,
      site_base_path: options.build.path,
      gh_repo: options.github.repository,
      gh_branch: options.github.branch,
      algolia_projectId: options.algolia.projectId,
      algolia_publicKey: options.algolia.publicKey,
      algolia_index: options.algolia.index,
      versions_config: versionsConfig
    })
    .source('./src')
    .destination('./build' + options.build.path) // does not work with 'dist' folder ...
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

  console.log(`==== processing sources files ====`);

  if (options.dev.watch) {
    console.log(`= watch enabled =`);

    metalsmith.use(changed())
  }

  metalsmith
    .use(links())
    .use(ancestry({
      match: '**/*.md',
      sortBy: ['order', 'title']
    }))

  if (options.dev.enabled) {
    console.log(`= generating map sass files =`);

    metalsmith
      .use(sass({
        sourceMap: true,
        sourceMapContents: true
      }))
  }
  else {
    metalsmith
      .use(sass({
        sourceMap: false,
        sourceMapContents: false
      }))
  }

  metalsmith
    .use(hljs())
    .use(hbtmd(handlebars, {
        pattern: '**/*.md'
    }))
    .use(markdown())
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

  if (options.dev.watch) {
    console.log(`= livereload enabled =`);

    metalsmith
      .use(debug())
      .use(livereload({ debug: false, delay: 500 }))
  }

  if (options.algolia.privateKey) {
    console.log(`= algolia indexing enabled =`);

    metalsmith
      .use(algolia({
        clearIndex: true,
        projectId: options.algolia.projectId,
        privateKey: options.algolia.privateKey,
        index: options.algolia.index,
        fileParser: options.algolia.fnFileParser
      }))
  }

  if (options.build.checkLinks) {
    console.log(`= checking dead links enabled =`);

    metalsmith
      .use(linkcheck({
        verbose: true,
        timeout: 5,
        checkFile: '.linkcheck/.links_checked.json',
        ignoreFile: '.linkcheck/links_ignore.json',
        failFile: '.linkcheck/links_failed.json'
      }))
  }

  if (options.build.compress) {
    console.log(`= build compression enabled (may take a while) =`);

    metalsmith
      .use(inlineSVG())
      .use(optipng({
        pattern: '**/*.png',
        options: ['-o7']
      }))
      .use(htmlMin())
      .use(compress())
      .use(sitemap({
        hostname: options.build.host,
        modifiedProperty: 'stats.mtime',
        omitIndex: true
      }))
  }

  console.log(`==== building site in "${options.build.path}" ====`);

  metalsmith.build((error, files) => {
    console.log('==== build finished ====');

      if (error) {
        console.error(error)

        if (!options.dev.enabled) {
          return done(error)
        }
      }
      done()
    })
}

if (options.dev.enabled) {
  // run dev server (build & serv ./build directory on 8080 port & watch => rebuild on change)
  var serve = new nodeStatic.Server(__dirname + '/build')

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

    req.addListener('end', () => serve.serve(req, res, (e, r) => {
      if (e && (e.status === 404) && fs.existsSync(__dirname + '/build' + options.build.path + '404.html')) {
        serve.serveFile(options.build.path + '404.html', 404, {}, req, res)
      }
    }))
    req.resume()
  }).listen(options.dev.port)

  if (options.dev.watch) {
    watch(__dirname + '/{src,layouts,partials}/**/*', { ignoreInitial: false, queue: false }, build)
  }
  else {
    build(error => {
      if (error) {
        console.error(error)
      }
    })
  }

  if (options.dev.openBrowser) {
    open('http://localhost:' + options.dev.port)
  }
} else {
  // only build static site
  build(error => {
    if (error) {
      console.error(error)
      return process.exit(1)
    }

    return process.exit(0)
  })
}
