## Plugin creation prerequisites

### > Writing plugin code

Plugins must be written in Javascript, for the Node.js interpreter. You must be accustomed to [how modules are loaded and exported](https://nodejs.org/docs/v4.6.2/doc/api/modules.html).

As Kuzzle treats plugins as Node.js modules, plugins must make themselves available to Kuzzle using `module.exports`. Otherwise Kuzzle won't be able to instantiate them.

### > Plugin default configuration

Plugins must have a `package.json` file in their root directory, containing a `pluginInfo` entry.

The optional `defaultConfig` attribute is used by Kuzzle to initialize the plugin configuration when installing it.

This configuration can then be changed using the command-line interface.

Default configuration example:

```json
"name": "plugin-name",
"version": "0.0.1",
"main": "./lib/index.js",
"pluginInfo": {
  "defaultConfig": {
    "any": "information",
    "useful": ["to", "the", "plugin"]
  }
}
```

### > Special plugin configurations

Additionally to plugins' custom configuration, there are a few reserved words used by Kuzzle to configure how a plugin is loaded:

```json
"name": "plugin-name",
"version": "0.0.1",
"main": "./lib/index.js",
"pluginInfo": {
    "defaultConfig": {
      "threads": 0,
      "privileged": false
    }
  }
```

Where:

| Keyword | Type | Default Value |Description                  |
|---------|------|---------------|-----------------------------|
|`threads`|`unsigned integer`|`0`| If > 0, the plugin will be treated as a worker plugin (see below) |
|`privileged`|`boolean`|`false`| If `true`, the plugin is loaded with privileged access to the running Kuzzle instance (see Plugin Context below)<br/>Ignored if `threads` is greater than `0` |

### > Plugin init function

Plugins must expose a ``init`` function.

Kuzzle calls these ``init`` function at startup, during initialization, and ignore any plugin without this function exposed.

Expected arguments:
``function (config, context)``

Where:

* ``config`` (JSON Object): JSON object containing the current plugin configuration
* ``context`` (JSON Object): the [plugin context](#the-plugin-context)
