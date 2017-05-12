# metalsmith-inline-svg

A metalsmith plugin that inlines svg images into your html to reduce the number of http requests.

Remember to be selective over which svgs you inline. If you inline svgs which appear on multiple pages you wont benefit from caching which you get with individually loaded files! 

This plugin doesn't remove the svg files after as it does no checking to see if they're used elsewhere.

## Installation

```
npm install metalsmith-inline-svg
```

## Example

```js
var inlineSVG = require('metalsmith-inline-svg');

Metalsmith(__dirname)
  .use(inlineSVG())
  .build()
```

## Options

You can pass options to `metalsmith-inline-svg` with the [Javascript API](https://github.com/segmentio/metalsmith#api) or [CLI](https://github.com/segmentio/metalsmith#cli). The options are:

* selector: A jQuery/cheerio selector string used to find the images to be  replaced (default `'img.svg'`)
* removeDefs: A boolean which tells the plugin whether to remove `<defs />` tags. I had some issues where the `DOMParser` was not correctly closing empty `defs` tags so we strip them out. (default `true`)
