const cheerio = require('cheerio');

const defaultLanguages = {
  js: 'Javascript',
  java: 'Android',
  php: 'PHP'
};

/**
 *
 */
module.exports = () => {
  return (files, metalsmith, done) => {
    setImmediate(done);

    for (const file in files) {
      if (!files.hasOwnProperty(file) || !file.endsWith('.html')) {
        continue;
      }

      const data = files[file];

      if (!data['language-tab']) {
        continue;
      }

      let languagesHeaders;

      if (typeof data['language-tab'] === 'object') {
        languagesHeaders = data['language-tab'];
      }
      else {
        languagesHeaders = defaultLanguages;
      }

      const whitelist = Object.keys(languagesHeaders);

      let selector = '';

      for (const key of whitelist) {
        if (key > 0) {
          selector += ', ';
        }
        selector += '.' + whitelist[key];
      }

      const $ = cheerio.load(data.contents.toString());

      // identify languages tabs
      let firstLanguage = null;

      $(selector).each((index, element) => {
        let languageClass;

        for (const cssClass of $(element).attr('class').split(' ')) {
          if (whitelist.indexOf(cssClass) > -1) {
            languageClass = cssClass;

            if (!firstLanguage) {
              firstLanguage = languageClass;
            }

            break;
          }
        }

        const e = $(element).is('code') ? $(element).parent() : $(element);

        e.addClass('language-tab');
        e.attr('data-language', languageClass);
      });

      let isFirst = false;
      $('[data-language=' + firstLanguage + '], hr').each((index, element) => {
        if ($(element).is('hr')) {
          isFirst = false;
          return;
        }

        if (!isFirst) {
          isFirst = true;
          $(element).addClass('language-first-tab');
        }
        $(element).addClass('language-tab-active');
      });

      const languageSelector = $('<div>');
      languageSelector.addClass('language-tab-selector');

      for (const i in whitelist) {
        if (whitelist.hasOwnProperty(i)) {
          const wval = whitelist[i];
          if (i === 0) { // activate first tab
            languageSelector.append(`<a href="#" class="language-tab-active" data-language-name="${wval}">${languagesHeaders[wval]}</a>`);
          }
          else {
            languageSelector.append(`<a href="#" data-language-name="${wval}">${languagesHeaders[wval]}</a>`);
          }
        }
      }

      // insert language selector
      $('.language-first-tab').each((index, element) => {
        $(element).before(languageSelector.clone());
      });


      data.contents = Buffer.from($.html());
      files[file] = data;
    }
  };
};
