---
layout: full.html
algolia: true
title: Manage Plugins
description: learn how to enable and configure plugins
order: 300
---

# Managing Plugins

---

## Installing, Removing, Enabling and Disabling Plugins

When Kuzzle Backend boots, it looks for plugins in the `plugins/enabled` directory.

Valid Plugins either contain a properly formatted NPM module (i.e. they have a `package.json` file in their root directory), or are a simple Node.js requireable (i.e. they have a valid `index.js` file in their root directory).

In either case, a plugin must meet a the [prerequisites]({{ site_base_path }}plugins-reference/plugins-creation-prerequisites) to be compatible with Kuzzle Backend.

In order to install a plugin, the recommended practice is to copy the plugin to the `plugins/available` folder and to then to create a symbolic link to this folder from the `plugins/enabled`. This way, enabling and disabling a plugin is just a matter of creating or deleting the symbolic link.

Each plugin is considered to be a separate and independant entity from Kuzzle Backend. If the plugin itself has dependencies, you must ensure that these dependencies are installed. For instance, if the plugin is an NPM module, you would need to run the `npm install` from inside the plugin directory.

---

## Configuring Plugins

When initializing a Plugin, Kuzzle Backend calls the plugin's `init(customConfig, context)` method, passing it the [context]({{ site_base_path }}plugins-reference/plugins-context) and the custom configuration.

Custom configuration parameters are specified for each plugin in the `plugins` object of the [Kuzzle Backend configuration file]({{ site_base_path }}guide/essentials/configuration).

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

Each Plugin is responsible of handling its own custom configuration parameters. Whether or not the custom configuration is merged with Kuzzle Backend's default parameters depends on how the plugin's `init` function is implemented.
