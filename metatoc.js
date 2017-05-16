const cheerio = require('cheerio')

/**
 *
 */
module.exports = function metatoc(options) {
  const selector = 'h1, h2, h3, h4, h5, h6'

  return function(files, metalsmith, done) {
    setImmediate(done)

    for (let file in files) {
      let data = files[file]
      let cacheIds = {}

      // load contents with cheerio to parse html nodes
      let $ = cheerio.load(data.contents.toString())
      // $('code').removeClass('hljs')

      if (!file.endsWith('.html')) {
        continue
      }

      files[file].toc = []

      $(selector).each((index, element) => {
        // extract id, title and heading level
        let id = $(element).attr("id")
        let title = $(element).text()
        // for (var i = 0; i < element.childNodes.length; ++i) {
        //   if (element.childNodes[i].type === 'text' && element.childNodes[i].data) {
        //     title += element.childNodes[i].data;
        //   }
        //   else if (element.childNodes[i].name === 'a') {
        //     title += element.childNodes[i].childNodes[0].data
        //   }
        // }
        //
        // if (title.length === 0) {
        //   title = $(element).text()
        // }


        let level = $(element).prop("nodeName").substring(1)
        let html = $(element).html()

        // make id unique
        if (!id) {
          id = ($(element).text()).replace(/&.*?/g, '').replace(/\s+/g, '-').replace(/[^\w\-]/g, '').replace(/[\-]+/g, '-').toLowerCase()
        }

        id = id.replace(/[-]+$/, '').replace(/^[-]+/, '')

        if (id === "constructor") {
          if (cacheIds["__constructor__"] !== undefined) {
            cacheIds["__constructor__"] += 1

            // duplicate id, add index to make it unique
            id = id + '-' + cacheIds[id].toString()
          }
        }
        else if (cacheIds[id] !== undefined) {
          // increment index for this id
          cacheIds[id] += 1

          // duplicate id, add index to make it unique
          id = id + '-' + cacheIds[id].toString()
        }

        cacheIds[id] = 0

        // place anchor in child element to allow customisation with css
        $(element).removeAttr('id')
        $(element).html(`<a class="anchor" id="${id}"></a>${html}`)

        // store toc in file metadata
        files[file].toc.push({
          level: level,
          order: index,
          path: files[file].path + '#' + id,
          id,
          title
        })
      })

      data.contents = new Buffer($.html())
      files[file] = data
    }
  }
}
