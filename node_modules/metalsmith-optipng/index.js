const OptiPng = require('optipng')
const toArray = require('stream-to-array')
const streamify = require('streamifier')
const _ = require('lodash')
const multimatch = require('multimatch')
const util = require('util')

// Promises to apply optipng optomizer to filename's content
function promiseToOptiPng(msFiles, filename, optomizer) {
	return new Promise((resolve) => {
		// Convert buffer to stream (what optipng expects)
		let fStream = streamify.createReadStream(msFiles[filename].contents)
		fStream = fStream.pipe(optomizer)

		// Convert stream back to buffer (what Metalsmith expects)
		toArray(fStream).then((parts) => {
			const buffers =
				_.map(parts, (part) =>
					(util.isBuffer(part) ? part : Buffer.from(part)))

			// Give Metalsmith it's optomized png buffer
			msFiles[filename].contents = Buffer.concat(buffers)

			// All done with async process
			resolve()
		})
	})
}

module.exports = (options) => {
	// Options and defaults
	const opts = options || {}
	if (!opts.pattern) {
		opts.pattern = '**/*.png'
	}
	if (!opts.options) {
		opts.options = []
	}

	// The actual plugin returned from `.use(...)` call
	return function(files, metalsmith, done) {
		let chain = Promise.resolve()

		_.forEach(files, (file, filename) => {
			// Skip files that don't match
			if (!multimatch(filename, opts.pattern).length) {
				return
			}

			// Add png optomization to chain
			chain = chain.then(() =>
				promiseToOptiPng(files, filename, new OptiPng(_.clone(opts.options))))
		})

		// Finish running
		chain.then(() => {
			setImmediate(done)
		})
	}
}
