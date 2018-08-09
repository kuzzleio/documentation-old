const
  Bluebird = require('bluebird'),
  cheerio = require('cheerio');

module.exports = () => {
  return (files, metalsmith, done) => {
    const promises = [];

    for (const file in files) {
      if (!files.hasOwnProperty(file) || !file.endsWith('.html')) {
        continue;
      }

      promises.push(new Bluebird(resolve => {
        const $ = cheerio.load(files[file].contents.toString());
        $('.content img:not([link-exclude])').each((index, image) => {
          const src = $(image).attr('src');
          $(image).wrap(`<a class="image" href="${src}"></a>`);
        });

        files[file].contents = Buffer.from($.html());

        resolve();
      }));
    }

    Bluebird.all(promises).then(() => done());
  };
};
