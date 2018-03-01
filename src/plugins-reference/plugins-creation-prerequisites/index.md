---
layout: full.html
algolia: true
title: Create a Plugin
description: how to develop a custom plugin
order: 200
---

# Creating Plugins

---

## Writing a Custom Plugin

Plugins must be constructed as a Node.js [module](https://nodejs.org/dist/latest-v6.x/docs/api/modules.html), containing either:

* an `index.js` file in its root directory, exporting a valid Javascript class exposing an `init` method, or
* a [`package.json`](https://docs.npmjs.com/files/package.json) file in its root directory, specifying the path of the entry point in the `main` field.

To determine the Plugin name, Kuzzle looks for the `name` field in the `package.json` file and if it does not exist it will use the plugin directory name.

---

## Custom Plugin Configuration

When initializing a Plugin, Kuzzle calls the plugin `init(customConfig, context)` method, passing the plugin's custom configuration and the [context]({{ site_base_path }}plugins-reference/plugins-context) as inputs.

Custom configuration parameters are specified for each plugin in the `plugins` object of the Kuzzle [configuration file]({{ site_base_path }}guide/essentials/configuration). For example:

```json
{
  "plugins": {
    "kuzzle-plugin-foobar": {
      "option_1": "option_value",
      "option_2": "option_value"
    }
  }
}
```

Each Plugin is responsible for handling any custom configuration parameters. The plugin `init` function will determine if the custom configuration is merged with the Kuzzle defaults or not.

Kuzzle has a set of predefined configuration parameters that are reserved and apply to the underlying Plugin Engine, these are:

```json
{
  "plugins": {
    "kuzzle-plugin-foobar": {
      "killTimeout": 6000,
      "maxMemoryRestart": "200M",
      "threads": 0
    }
  }
}
```

Where:

| Keyword | Type | Default Value |Description                  |
|---------|------|---------------|-----------------------------|
| `killTimeout` | `unsigned integer` | `6000 ` | (if `threads` > 0) Time (in milliseconds) to wait for a plugin to shut down before killing it |
| `maxMemoryRestart` | `string` | `1G` | (if `threads` > 0) Maximum memory usage of a worker plugin. If exceeded, the plugin is restarted. <br>Examples: `10K` (10KB), `200M` (200MB), `3G` (3GB)|

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
