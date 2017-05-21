const cheerio = require('cheerio')
const defaultLanguages = {
  js: 'Javascript',
  java: 'Android',
  php: 'PHP'
}
/**
 *
 */
module.exports = function languageTab(options) {
  let selector = '.hljs'
  let languagesHeaders = defaultLanguages
  let whitelist = Object.keys(languagesHeaders)

  return function (files, metalsmith, done) {
    setImmediate(done)

    for (let file in files) {
      let data = files[file]
      let languages = []
      let languageSelector
      let firstLanguage

      // load contents with cheerio to parse html nodes
      let $ = cheerio.load(data.contents.toString())

      if (!file.endsWith('.html')) {
        continue
      }

      if (!data['language-tab']) {
        continue
      }

      if (typeof data['language-tab'] === 'object') {
        languagesHeaders = data['language-tab']
      }
      else {
        languagesHeaders = defaultLanguages
      }

      whitelist = Object.keys(languagesHeaders)

      selector = ''
      for (let key in whitelist) {
        if (key > 0) {
          selector += ', '
        }
        selector += '.' + whitelist[key]
      }


      // identify languages tabs
      $(selector).each((index, element) => {
        let classes = $(element).attr('class').split(' ');
        let parent = $(element).parent()
        let languageClass = '';

        for (let cssClass of classes) {
          if (whitelist.indexOf(cssClass) > -1) {
            languageClass = cssClass

            if (!firstLanguage) {
              firstLanguage = languageClass
            }
            break
          }
        }

        if ($(element).is('code')) {
          parent.addClass('language-tab')
          parent.attr('data-language', languageClass)
        }
        else {
          $(element).addClass('language-tab')
          $(element).attr('data-language', languageClass)
        }
      })

      let isFirst = false
      $('[data-language=' + firstLanguage + '], hr').each((index, element) => {
        if ($(element).is('hr')) {
          isFirst = false
          return
        }
        if (!isFirst) {
          isFirst = true
          $(element).addClass('language-first-tab')
        }
        $(element).addClass('language-tab-active')
      })

      languageSelector = $('<div>')
      languageSelector.addClass('language-tab-selector')

      for (let i in whitelist) {
        if (i == 0) { // activate first tab
          languageSelector.append(`<a href="#" class="language-tab-active" data-language-name="${whitelist[i]}">${languagesHeaders[whitelist[i]]}</a>`)
        }
        else {
          languageSelector.append(`<a href="#" data-language-name="${whitelist[i]}">${languagesHeaders[whitelist[i]]}</a>`)
        }
      }

      // insert language selector
      $('.language-first-tab').each((index, element) => {
        let el = languageSelector.clone()

        $(element).before(el)
      })


      data.contents = new Buffer($.html())
      files[file] = data

    }
  }
}
