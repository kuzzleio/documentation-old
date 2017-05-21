# Table of Contents

- [Install](#install)
- [How-to](#how-to)
  - [File organization](#file-organization)
    - [Documentation sections](#documentation-sections)
    - [Documentation subsections](#documentation-subsections)
    - [Documentation articles](#documentation-articles)
- [File headers](#file-headers)
  - [layout](#layout)
  - [order](#order)
  - [show-subheader](#show-subheader)
  - [subheader-title](#subheader-title)
- [Sorting the documentation](#sorting-the-documentation)
- [See also](#see-also)

# Install

> install dependencies

`npm install`

> build the documentation in production mode and index content into algolia

`node index.js --build-host http://docs.kuzzle.io --build-path /v/edge --build-compress --algolia-private-key <key>`

> bind a webserver on 8080 with livereload and watch enabled

`node index.js --dev --watch`

> bind a webserver on 80 with livereload, open a browser and turn on debug messages and check dead links

`sudo DEBUG=* node index.js --dev --watch --open-browser --port 80 --ckeck-links`

# How-to

## File organization

Here is an overview of the files structure:

* `src/`: documentation entry point
* `src/<section>/` (for instance: `src/guide/`, entry point of the Guide documentation section)
* `src/<section>/<subsection>/` (for instance: `src/guide/essentials/`)
* `src/<section>/<subsection>/<article>.md` (for instance: `src/guide/essentials/installing-kuzzle.md`)


Though there is no real limit to the directories depth, to keep the documentation homogeneous and readable, no additional subdirectories should be added.

### Documentation sections

Sections are listed as subdirectories in `src/`.  
For instance: `src/guide/`.

Each section directory must contain an `index.md` file, with the following headers:

```
---
layout: category-childrens.html
title: <Name used in the section list>
order: <(optional, integer)>
description: <(optional) Text appearing under the section name in the section list>
icon: <font-awesome icon name>
---
```

For more information about headers, see the [file headers](#file-headers) documentation.

### Documentation subsections

Subsections are directories listed under a [section directory](#documentation-sections).   
For instance: `src/guide/essentials/`

A subsection has one of the 3 following behaviors:

* Articles container (e.g. `/sdk-reference/essentials/`). This is the default behavior when markdown files other than `index.md` are present in the subsection directory. When selected:
  * lists articles stored in the subsection
  * does NOT appear itself in the articles list (the `index.md` content is ignored)
  * shows the first article documentation found in the list
* Standalone article (e.g. `/guide/getting-started/`). This is the default behavior when `index.md` is the only file in the subsection directory. When selected:
  * does not deploy any articles list
  * shows the `index.md` content directly
* Articles container + standalone article (e.g. `/guide/essentials/`). This behavior can only be activated through the [show-subheader](#show-subheader) header. When selected:
  * lists articles stored in the subsection
  * lists `index.md` as the first article available, using the optional [subheader-title](#subheader-title) header value (or the title one if not set)
  * shows the `index.md` content directly

Each subsection directory must contain an `index.md` file, with the following headers:

```
---
layout: <full.html or category-members.html>
algolia: [true|false]
title: <Name used in the subsection list>
description: <(optional) Text appearing under the subsection name in the subsection list>
order: <(optional, integer)>
show-subheader: <(optional, boolean, default: false)>
subheader-title: <(optional, default: title header value)>
---
```

For more information about headers, see the [file headers](#file-headers) documentation.

### Documentation articles

Articles are markdown files stored under a [subsection directory](#documentation-subsections).  
For instance: `src/guide/essentials/installing-kuzzle.md`

Each article file must contain a header with the following properties:

```
---
layout: <full.html or side-code.html>
algolia: [true|false]
title: <Article name in the subsection list>
order: <(optional, integer)>
---
```

For more information about headers, see the [file headers](#file-headers) documentation.

# File headers

Here is a rundown of the possible header values that can be configured in markdown files:

## layout

The `layout` header sets the way the selected page is displayed:

* `category-childrens.html`: fit for [sections](#documentation-sections), this layout displays the section title, its description, and a list of available subsections
* `category-members.html`: fit for [subsections](#documentation-subsections) without content to display in their `index.md` file, this layout displays a list of available articles
* `full.html`: fit for [articles](#documentation-articles) without code example, this layout displays the content of the article, with a table of content navigation menu
* `side-code.html`: fit for [articles](#documentation-articles) embedding code examples, this layout displays the content of the article on the left, and code examples on the right part of the page

## order

**Type:** integer  
**Default:** `<undefined>`

Defines the section, subsection or article position relative to others.

For more information, see [how the documentation is sorted](#sorting-the-documentation)

## show-subheader

**Type:** boolean  
**Default:** `false`

To be used only on subsection `index.md` files.

By default, we configured this documentation to **hide** the content of `index.md` files in subsections (see [documentation subsections](#documentation-subsections)).

This header makes the content of `index.md` appear like any other article, using the [subheader-title](#subheader-title) title if set (or the title header otherwise).


## subheader-title

**Type:** string  
**Default:** `<undefined>`

If [show-subheader](#show-subheader) is set to `true`, then this value is used as the article name in the navigation bar.

# Sorting the documentation

Inside each category (section, subsection, article), all files are automatically sorted.  
The final order of sections, subsections or articles depends on two values: the [order header](#order) and the title header, the former having precedence over the latter:

* if no `order` header is specified across all files of the same category (section, subsection, or article), sorting is done solely using the `title` header
* if there is a mix of files with the `order` header while others don't have one:
  * files with the `order` header are sorted relative to each other and put at the start of the list
  * then, files without this header are sorted using their `title` header value, and put afterward

**Example:**

The SDK reference contain subsections, each one with a `index.md` file:

* `/sdk-reference/essentials/index.md` has an order set to `0`
* `/sdk-reference/kuzzle/index.md` has an order set to `100`
* all other subsections are without an `order` header: they are listed after `essentials` and `kuzzle` subsections, but sorted using their title header value

# See also

- [metalsmith](https://www.npmjs.com/package/metalsmith)
- [awesome-metalsmith](https://github.com/metalsmith/awesome-metalsmith)
- [metalsmith-ancestry](https://www.npmjs.com/package/metalsmith-ancestry)
- [handlebarsjs](http://handlebarsjs.com/)
