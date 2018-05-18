const 
  Metalsmith = require('metalsmith'),
  handlebars = require('handlebars'),
  cheerio = require('cheerio'),
  stripTags = require('striptags'),
  wordCount = require('wordcount'),

  markdown = require('metalsmith-markdown'),
  marked = require('marked'),
  permalinks = require('metalsmith-permalinks'),
  ancestry = require('metalsmith-ancestry'),
  links = require('metalsmith-relative-links'),
  hbtmd = require('metalsmith-hbt-md'),
  sass = require('metalsmith-sass'),
  autoprefix = require('metalsmith-autoprefixer'),
  linkcheck = require('metalsmith-linkcheck'),
  hljs = require('metalsmith-metallic'),
  inlineSVG = require('metalsmith-inline-svg'),
  compress = require('metalsmith-gzip'),
  optipng = require('metalsmith-optipng'),
  sitemap = require('metalsmith-sitemap'),
  htmlMin = require('metalsmith-html-minifier'),
  algolia = require('metalsmith-algolia'),
  jsPacker = require('metalsmith-js-packer'),
  cssPacker = require('metalsmith-css-packer'),
  redirect = require('metalsmith-redirect'),
  discoverPartials = require('metalsmith-discover-partials'),
  jstransformer = require('metalsmith-jstransformer'),

  logger = require('./metalsmith-plugins/logger'),
  metatoc = require('./metalsmith-plugins/metatoc'),
  languageTab = require('./metalsmith-plugins/language-tab'),
  clickImage = require('./metalsmith-plugins/clickable-images'),
  saveSrc = require('./metalsmith-plugins/save-src'),

  serve = require('metalsmith-serve'),
  watch = require('metalsmith-watch'),
  color = require('colors/safe'),

  versionsConfig = require('./versions.config.json');

const 
  ok = color.green('✔'),
  nok = color.red('✗');

function log (args) {
  console.log(color.magenta('[kuzzle-docs]'), args);
}

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
};

if (process.argv.indexOf('--dev') > -1) {
  options.dev.enabled = true;
}

if (process.argv.indexOf('--open-browser') > -1) {
  options.dev.openBrowser = true;
}

if (process.argv.indexOf('--port') > -1) {
  options.dev.port = parseInt(process.argv[process.argv.indexOf('--port') + 1]);
}

if (process.argv.indexOf('--watch') > -1) {
  options.dev.watch = true;
}

if (process.argv.indexOf('--ckeck-links') > -1) {
  options.build.checkLinks = true;
}

if (process.argv.indexOf('--build-compress') > -1) {
  options.build.compress = true;
}

if (process.argv.indexOf('--build-path') > -1) {
  options.build.path = process.argv[process.argv.indexOf('--build-path') + 1];
}

if (process.argv.indexOf('--build-host') > -1) {
  options.build.host = process.argv[process.argv.indexOf('--build-host') + 1];
}

if (process.argv.indexOf('--algolia-private-key') > -1) {
  options.algolia.privateKey = process.argv[process.argv.indexOf('--algolia-private-key') + 1];
}

if (options.dev.enabled) {
  log(`Starting ${color.bold('development')} environment...`);
} else {
  log(`Starting ${color.bold('production')} build...`);
}

for (let config of versionsConfig) {
  if (config.version_path === options.build.path) {
    log(`Using version ${color.bold(config.version_label)}`);

    options.github.repository = config.version_gh_repo;
    options.github.branch = config.version_gh_branch;
    options.algolia.index = config.algolia_index;
  }
}

options.algolia.fnFileParser = (file, data) => {
  let objects = [];
  let $ = cheerio.load(data.contents.toString(), {
    normalizeWhitespace: true
  });
  let content = $('.main-content');

  // remove useless content
  $('.hljs', content).remove();
  $('blockquote', content).remove();
  $('.language-tab-selector', content).remove();
  $('h1, h2, h3, h4, h5, h6', content).remove();

  objects.push({
    objectID: data.path,
    title: data.title,
    description: data.description ? data.description : '',
    path: data.path,
    content: content.text(),
    parent: (data.ancestry.parent ? data.ancestry.parent.title : ''),
    firstMember: (data.ancestry.firstMember ? data.ancestry.firstMember.title : ''),
    toc: data.toc
  });

  return objects;
};

/**
 * Usefull handlebars helpers
 */
handlebars.registerHelper({
  not: function(v) {
    return !v;
  },
  eq: function (v1, v2) {
    return v1 === v2;
  },
  ne: function (v1, v2) {
    return v1 !== v2;
  },
  lt: function (v1, v2) {
    return v1 < v2;
  },
  gt: function (v1, v2) {
    return v1 > v2;
  },
  lte: function (v1, v2) {
    return v1 <= v2;
  },
  gte: function (v1, v2) {
    return v1 >= v2;
  },
  and: function (v1, v2) {
    return v1 && v2;
  },
  or: function (v1, v2) {
    return v1 || v2;
  },
  startwith: function (str, substr) {
    if (!str) {
      return false;
    }
    return str.startsWith(substr);
  },
  mstartwith: function(...args) {
    const str = args.shift();
 
    if (!str) {
      return false;
    }
 
    return args.reduce((found, currentStr) => found || str.startsWith(currentStr), false);
  },
  endswith: function (str, substr) {
    return str.endsWith(substr);
  },
  firstDefinedOf: function (...args) {
    return args.find(a => a);
  },
  currentYear: function () {
    return new Date().getFullYear();
  },
  dateToISO: function(d) {
    if (d instanceof Date) {
      return d.toISOString();
    }

    return d;
  },
  wordsToTime: function(context) {
    // It seems that 75 words per minute is a fair value for technical material
    return Math.ceil(wordCount(stripTags(context.data.root.contents)) / 75);
  },
  since: version => `<p class="since">Since Kuzzle v${version}</p>`,
  deprecated: version => `<p class="deprecated">Deprecated since Kuzzle v${version}. This feature should not be used.</p>`
});

// Build site with metalsmith.
let metalsmith = new Metalsmith(__dirname)
  .metadata({
    site_title: 'Kuzzle documentation',
    site_url: options.build.host,
    site_base_path: options.build.path,
    gh_repo: options.github.repository,
    gh_branch: options.github.branch,
    algolia_projectId: options.algolia.projectId,
    algolia_publicKey: options.algolia.publicKey,
    algolia_index: options.algolia.index,
    versions_config: versionsConfig,
    is_dev: options.dev.enabled
  })
  .source('./src')
  .destination('./build' + options.build.path) // does not work with 'dist' folder ...
  .clean(true)
  .use(saveSrc())
  .use((files, m, done) => {
    setImmediate(done);

    for (const path of Object.keys(files)) {
      if (path.endsWith('.md') && files[path].order === undefined) {
        files[path].order = Number.MAX_SAFE_INTEGER;
      }
    }
  });

metalsmith
  .use(links())
  .use(ancestry({
    match: '**/*.md',
    sortBy: ['order', 'title']
  }));

if (options.dev.enabled) {
  metalsmith
    .use(sass({
      sourceMap: true,
      sourceMapContents: true
    }));
}
else {
  metalsmith
    .use(sass({
      sourceMap: false,
      sourceMapContents: false
    }))
    .use(autoprefix());
}

// We override the default Markdown table renderer because
// we want tables to be wrapped into divs (for responsivity reasons).
const newMDRenderer = new marked.Renderer();
const tableRenderer = new marked.Renderer().table;

newMDRenderer.table = function (header, body) {
  return `<div class='table-wrapper'>${tableRenderer(header, body)}</div>`;
};

metalsmith
  .use(hljs())
  .use(hbtmd(handlebars, {
    pattern: '**/*.md'
  }))
  .use(markdown({
    renderer: newMDRenderer
  }))
  .use(permalinks({
    // It is very important that this option is set to false.
    // Otherwise, the partial builds in dev mode are not effective,
    // since this plugin overwrites the processed files with their
    // old version.
    relative: false
  }))
  .use(redirect({
    '/': '/guide/getting-started',
    '/guide': '/guide/getting-started',
    '/api-documentation/': '/api-documentation/connecting-to-kuzzle/',
    '/sdk-reference/': 'essentials/',
    '/plugins-reference/': 'plugins-features/',
    '/elasticsearch-cookbook/': '/elasticsearch-cookbook/installation/',
    '/kuzzle-dsl/': '/kuzzle-dsl/essential/koncorde/',
    '/validation-reference/': '/validation-reference/schema/',
    '/kuzzle-events/': '/kuzzle-events/plugin-events/',
    '/guide/code-examples': '/guide/code-examples/dbsearch'
  }))
  .use(metatoc())
  .use(languageTab())
  .use(discoverPartials({
    directory: 'src/partials',
    pattern: /\.html$/
  }))
  .use(jstransformer({
    layoutPattern: 'layouts/**',
    defaultLayout: null

  }));

if (!options.dev.enabled) {
  log('CSS and JS packers enabled');
  metalsmith
    .use(cssPacker({
      siteRootPath: options.build.path,
      inline: true,
      exclude: ['partials/**/*', 'layouts/**/*']
    }))
    .use(jsPacker({
      siteRootPath: options.build.path,
      inline: false,
      exclude: ['partials/**/*', 'layouts/**/*']
    }));
}
metalsmith
 .use(clickImage())
 .use(logger());

if (options.algolia.privateKey) {
  log('Algolia indexing enabled');

  metalsmith
    .use(algolia({
      clearIndex: true,
      projectId: options.algolia.projectId,
      privateKey: options.algolia.privateKey,
      index: options.algolia.index,
      fileParser: options.algolia.fnFileParser
    }));
}

if (options.build.checkLinks) {
  log('Checking dead links enabled');

  metalsmith
    .use(linkcheck({
      verbose: true,
      timeout: 5,
      checkFile: '.linkcheck/.links_checked.json',
      ignoreFile: '.linkcheck/links_ignore.json',
      failFile: '.linkcheck/links_failed.json'
    }));
}

if (options.build.compress) {
  log('Compression enabled (build may take a while)');

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
    }));
}

if (options.dev.enabled) {
  metalsmith
  .use(serve({
    port: 3000,
    verbose: false,
    host: 'localhost'
  }))
  .use(
    watch({
      paths: {
        'src/assets/stylesheets/**/*': 'assets/stylesheets/**/*',
        'src/**/*.md': '**/*.md',
        'src/partials/**/*': '**/*.md',
        'src/layouts/**/*': '**/*.md',
        'src/assets/**/*.js': true
      },
      livereload: true
    })
  );
}

log(`Building site in "${options.build.path}"`);
metalsmith.build(error => {
  if (error) {
    log(nok + color.yellow(' Ooops...'));
    console.error(error);
    return;
  }
  log(ok + ' Build finished');
});
