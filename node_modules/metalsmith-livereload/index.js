const livereload = require('livereload');

/**
 * Live reload server. Only one instance.
 */
let server;

const defaults = {
  debug: false,
  script: `<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>`
};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);

  function debug () {
    if (options.debug) {
      let msg = 'metalsmith-livereload: ';
      let args = Array.prototype.slice.call(arguments);
      msg += args.join(' ');
      console.log(msg);
    }
  }

  if (!server) {
    debug('Starting livereload server.');
    server = livereload.createServer({ debug: options.debug });
  }

  return function (files, metalsmith, done) {
    const filenames = Object.keys(files);

    filenames.forEach((file) => {
      if (file.toLocaleLowerCase().search(/\.html$/) === -1) {
        return;
      }
      let contents = files[file].contents.toString();
      let bodyEnd = contents.indexOf('</body>');
      if (bodyEnd === -1) {
        debug(`Warning, </body> not found in ${file}, not adding livereload script.`);
        return;
      }
      files[file].contents = contents.substr(0, bodyEnd);
      files[file].contents += options.script;
      files[file].contents += contents.substr(bodyEnd);
    });

    if (filenames.length !== 0) {
      server.refresh(filenames[0]);
    }

    done();
  };
};
