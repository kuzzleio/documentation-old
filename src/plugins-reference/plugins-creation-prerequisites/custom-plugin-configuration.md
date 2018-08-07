---
layout: full.html.hbs
algolia: true
title: Custom Plugin Configuration
order: 2
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

{{{deprecated "1.0.0"}}}

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
