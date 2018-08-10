---
layout: full.html.hbs
algolia: true
title: Creating a Plugin
description: how to create a custom plugin
order: 200
show-subheader: true
subheader-title: Requirements
---

## Requirements


#### Plugins must be Node.js modules

Kuzzle loads plugins as [Node.js requirable modules](https://nodejs.org/dist/latest-v8.x/docs/api/modules.html).

This means that a plugin directory must contain either:

* an `index.js` file 

and/or:

* a valid [`package.json`](https://docs.npmjs.com/files/package.json) file. If the plugin's entrypoint is not the `index.js` file in the plugin's root directory, then the ["main" property](https://docs.npmjs.com/files/package.json#main) must be filled


#### Plugins must expose a manifest.json file

Kuzzle needs a few informations to make your plugin work properly. These informations must be provided in a `manifest.json` file, in the plugin directory.

The following properties can be defined in this `manifest.json` file:

* `name` (**required**): Plugin unique identifier. Names can only contain lowercase letters, numbers, hyphens and underscores. 
* `kuzzleVersion`: a non-empty string describing a [semver range](https://www.npmjs.com/package/semver#ranges), limiting the range of Kuzzle versions supported by this Plugin. If not set, a warning is displayed on the console, and Kuzzle assumes that the Plugin is only compatible with Kuzzle v1.x

{{{deprecated "1.5.0"}}} Kuzzle still allows plugins to be loaded without a `manifest.json` file, for backward compatibility reasons, falling back to [the `package.json` file](https://docs.npmjs.com/files/package.json#name) to retrieve a plugin's name. This will change in next major releases of Kuzzle.
