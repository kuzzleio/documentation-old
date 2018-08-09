---
layout: full.html.hbs
algolia: true
title: Creating a Plugin
description: how to create a custom plugin
order: 200
show-subheader: true
subheader-title: Introduction
---

## Introduction

Plugins must be constructed as a Node.js [module](https://nodejs.org/dist/latest-v8.x/docs/api/modules.html), containing either:

* an `index.js` file in its root directory, exporting a valid Javascript class exposing an `init` method, or
* a [`package.json`](https://docs.npmjs.com/files/package.json) file in its root directory, specifying the path of the entry point in the `main` field.

To determine the Plugin name, Kuzzle looks for the `name` field in the `package.json` file and if it does not exist it will use the plugin directory name.
