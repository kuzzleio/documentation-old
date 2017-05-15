# Playing with metalsmith

`npm install`
> install dependencies

`node index.js --gzip`
> builds src into build/ folder

`node index.js --dev --watch`
> bind a webserver on 8080 with livereload and watch enabled

`DEBUG=* node index.js --dev --watch --open`
> bind a webserver on 8080 with livereload, open a browser and turn on debug messages


# Specific metadata keywords

This project extends metalsmith with new keywords specific to this projet:

* `show-subheader: true`: by default, the 1st member of a section (usually the `index.md` file) is not listed in the subheaders navigation menu. This flag makes this member appear as any other file
* `subheader-title: <Title>`: if `show-subheader` is set to true, then the 1st member of a section appears with its title as a subheader title in the navigation menus. This option makes metalsmith use a dedicated subheader title instead

### Useful links
- [https://www.npmjs.com/package/metalsmith](https://www.npmjs.com/package/metalsmith)
- [https://github.com/metalsmith/awesome-metalsmith](https://github.com/metalsmith/awesome-metalsmith)
- [https://www.npmjs.com/package/metalsmith-ancestry](https://www.npmjs.com/package/metalsmith-ancestry)
- [http://handlebarsjs.com/](http://handlebarsjs.com/)


### todo
- [x] compile markdown
- [x] compile sass
- [x] custom layout
- [x] livereload
- [x] auto tree (reference the next, previous, parent and all children of a particular resource)
- [x] find a way to get sdk-exemples/api-reference working (with tabs / custom template / ...)
- [ ] ~multi version capability ([we can use multi-language plugin](https://github.com/doup/metalsmith-multi-language))~
- [x] generate table of content ~([maybe this ?](https://github.com/majodev/metalsmith-headings-identifier))~
- [ ] ~client-side search [with lunr](https://github.com/CMClay/metalsmith-lunr)~
- [x] try a [broken link checker](https://github.com/gchallen/code.metalsmith-linkcheck)
- [x] try [discus](https://github.com/vitaliy-bobrov/metalsmith-disqus)
- [ ] ~try content [fingerprint](https://github.com/christophercliff/metalsmith-fingerprint)~
