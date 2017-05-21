---
layout: full.html
algolia: true
title: Managing Plugins
description: learn how to enable and configure plugins
order: 300
---

# Managing Plugins

---

## Installing, removing, enabling and disabling plugins

When starting, Kuzzle (both Core and Proxy) looks for directories in the `plugins/enabled` directory.

Valid Plugins directories either contain a well-formed NPM module (i.e. they have a `package.json` file in their root directory), or are a simple NodeJS requireables (i.e. they have a valid `index.js` file in their root directory).

In either cases, a plugin must meet a certain number of [prerequisites]({{ site_base_path }}plugins-reference/plugins-creation-prerequisites) to allow Kuzzle to use it.

To install a plugin, the recommended practice is to copy the directory containing it in the `plugins/available` folder and to create a symbolic link in the `plugins/enabled` one, pointing to it. This way, enabling and disabling a plugin is just a matter of creating or deleting a symbolic link.

Each plugin is a separate and independant entity, and Kuzzle will try to load it as is. If it has dependencies, you must ensure these are installed. For instance, by running the command `npm install` from inside a plugin directory, if the plugin is a NPM module.

---

## Configuring Plugins

When initializing a Plugin, Kuzzle (both Core and Proxy) calls its `init(customConfig, context)` method, passing the [context]({{ site_base_path }}plugins-reference/plugins-context) and the custom configuration.

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

Each Plugin is responsible of handling its own custom configuration parameters and Kuzzle has no opinion on how to do it. Whether the custom configuration is merged with the defaults or not entirely depends on the implementation of the plugin's `init` function.
