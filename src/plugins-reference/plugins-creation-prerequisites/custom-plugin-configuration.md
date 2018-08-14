---
layout: full.html.hbs
algolia: true
title: Custom Plugin Configuration
order: 3
---

## Custom Plugin Configuration

When initializing a Plugin, Kuzzle calls the plugin `init(customConfig, context)` method, passing the plugin's custom configuration and the [context]({{ site_base_path }}plugins-reference/plugins-context) as inputs.

Custom configuration parameters are specified for each plugin in the `plugins` object of the Kuzzle [configuration file]({{ site_base_path }}guide/essentials/configuration). For example:

```json
{
  "plugins": {
    "foobar-plugin": {
      "option_1": "option_value",
      "option_2": "option_value"
    }
  }
}
```

This customization is especially useful if you need to ship your plugin with a standard configuration, while allowing your plugin's clients to configure it to meet their need.

The plugin `init` function receives only the custom configuration (if any) as its first argument, and each Plugin is responsible for handling default configuration parameters if no customization occured.
