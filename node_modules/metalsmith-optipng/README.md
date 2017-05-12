Metalsmith wrapper for [optipng](https://www.npmjs.com/package/optipng)

## Example use

```
npm i metalsmith-optipng --save
```

```javascript
const optipng = require('metalsmith-optipng')
Metalsmith(__dirname)
	...
	.use(optipng({
		pattern: '**/*.png'
		options: ['-o7']
	})
	...

```

## Parameters

* **pattern** is relative to your source and uses multimatch / glob to choose which files to apply to
* **options** are passed along to optipng
