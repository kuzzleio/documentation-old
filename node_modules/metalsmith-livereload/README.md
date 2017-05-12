# metalsmith-livereload

Starts a [livereload] server and injects client side livereload script before `</body>` to all `.html`-files.

## Install
```sh
npm install metalsmith-livereload
```

## Usage
```js
Metalsmith(__dirname)
  .use(changed())  // metalsmith-changed
  .use(markdown())
  .use(livereload({
    // defaults
    debug: false,  // print debug messages
    script: '<script ...'  // livereload script to inject
  }))
  .build((err, files) => {
    if (err) return console.log(err);
    let filenames = Object.keys(files).join(', ');
    console.log('Built: ' + filenames);
  });
```

Here is a full example with http serving, watching files, building only [modified files] and livereloading:

```js
const Metalsmith = require('metalsmith');
const changed = require('metalsmith-changed');
const nodeStatic = require('node-static');
const livereload = require('metalsmith-livereload');
const watch = require('glob-watcher');
const open = require('open');

const DIR = __dirname + '/test/fixtures/';

/**
 * Build with metalsmith.
 */
const build = (clean = false) => (done) => {
  console.log(`Building. clean: ${clean}.`);
  Metalsmith(DIR)
    .clean(clean)
    .use(changed())
//    .use(expensivePlugin())  // ie markdown -> html
    .use(livereload({ debug: true }))
    .build((err, files) => {
      let filenames = Object.keys(files).join(', ');
      console.log('Built: ' + filenames);
      done(err);
    });
};

/**
 * Serve files.
 */
var serve = new nodeStatic.Server(DIR + 'build');
require('http').createServer((req, res) => {
  req.addListener('end', () => serve.serve(req, res));
  req.resume();
}).listen(8080);

/**
 * Watch files.
 */
watch(DIR + 'src/**/*', { ignoreInitial: false }, build(false));
// watch(DIR + 'templates/**/*', build(true));  // force build of all files

/**
 * Open browser.
 */
open('http://localhost:8080');
```

[livereload]: https://www.npmjs.com/package/livereload
[changed files]: https://github.com/arve0/metalsmith-changed