---
layout: full.html.hbs
algolia: true
title: Plugin 'init' Function
order: 3
---

## Plugin 'init' Function

All plugins must expose an `init` function. If it is missing, Kuzzle will fail to load the plugin and shutdown.
The `init` method is called by Kuzzle when it is booting and is used to initialize a plugin:

`init (config, context) { /* ... */ }`
Where:

* ``config`` (JSON Object): JSON object containing the custom plugin configuration
* ``context`` (JSON Object): the [plugin context]({{ site_base_path }}plugins-reference/plugins-context)


The `init` function can:

* throw an error: Kuzzle will properly shutdown if it does
* return a Promise, if async tasks need to be performed. If so, please note that if a plugin does not resolve (or reject) the returned Promise within the configured timeout (see `plugins.common.initTimeout` in [Configuring Kuzzle]({{ site_base_path }}guide/essentials/configuration/)), then Kuzzle will throw a timeout error and shutdown
