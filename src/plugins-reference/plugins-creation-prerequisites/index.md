---
layout: full.html
algolia: true
title: Plugins creation prerequisites
description: requirements to develop your plugin
order: 100
---

# Plugins creation prerequisites

---

## Writing plugin code

Plugins must be valid NodeJS require-able [modules](https://nodejs.org/dist/latest-v6.x/docs/api/modules.html), usually shipped as a directory containing either:

* an `index.js` file in its root directory, exporting a valid Javascript class exposing an `init` method, or
* a well-formed `package.json` file in its root directory, specifying the path of the main require-able in the `main` field.

To determine the Plugin name, Kuzzle looks for the `name` field in the `package.json` file falling back to the plugin directory name otherwise.

---

## Custom Plugin configuration

When initializing a Plugin, Kuzzle calls its `init(customConfig, context)` method, passing the [context]({{ site_base_path }}plugins-reference/plugins-context) and the plugin's custom configuration.

Custom configuration parameters are specified for each plugin in the `plugins` object of the [Kuzzle configuration file]({{ site_base_path }}guide/essentials/configuration).

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

Each Plugin is responsible of handling the custom configuration parameters and Kuzzle has no opinion on how to do it. Whether the custom configuration is merged with the defaults or not entirely depends on the implementation of the `init` function.

Within a plugin's custom configuration, there are a few reserved words used by Kuzzle to configure how a plugin is loaded:

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
|`threads`|`unsigned integer`|`0`| If > 0, the plugin will be treated as a worker plugin (see below) |

---

## Plugin init function

Plugins must expose a `init` function.

Kuzzle calls the `init` function at startup, during initialization, and ignores any plugin without this function exposed.

Expected arguments:
`function (config, context)`

Where:

* ``config`` (JSON Object): JSON object containing the custom plugin configuration
* ``context`` (JSON Object): the [plugin context]({{ site_base_path }}plugins-reference/plugins-context)
