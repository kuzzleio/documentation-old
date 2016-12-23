## Extending Kuzzle with plugins

Plugins are external components extending Kuzzle with custom features.

There are several types of plugins:

* [Listener plugins](http://kuzzle.io/documentation/plugin-reference#listener-plugins) listen to events and are supplied with these events data. Cannot change the provided data, and Kuzzle does not wait for them either
* [Workers plugins](http://kuzzle.io/documentation/plugin-reference#worker-plugins) are just like listener plugins, but they are run on a separate processes. Useful when performing costly operations as they do not imped Kuzzle performances.
* [Pipe plugins](http://kuzzle.io/documentation/plugin-reference#pipe-plugins) listen to events, and can validate or modify the provided data. Kuzzle waits for pipe plugins before continuing processing data.
* [Controller plugins](http://kuzzle.io/documentation/plugin-reference#controllers) extend Kuzzle API with new controllers and actions.
* [Protocol plugins](http://kuzzle.io/documentation/plugin-reference#protocol-plugins) extend Kuzzle networking capabilities by adding new network protocols to it
* [Authentication plugins](http://kuzzle.io/documentation/plugin-reference#authentication-plugin) add new Kuzzle authentication strategies

### Managing plugins using the CLI

Plugins can be managed using the Kuzzle command-line interface:

```
$ ./bin/kuzzle plugins --help

  Usage: plugins [options] [name]

  manage plugins

  Options:

    -h, --help                      output usage information
        --list                      list currently installed plugins
        --install                   if plugin [name] is provided, install it from --version, --url or --path, otherwise, (re-)install all listed plugins
        --remove                    remove plugin [name] from Kuzzle
        --activate                  mark the plugin as "activated"
        --deactivate                mark the plugin as "deactivated"
        --importConfig <file>       import plugin [name] configuration from <file>
        --get                       get plugin [name] configuration stored in Kuzzle
        --set <JSONObject>          merge plugin [name] configuration with JSONObject
        --unset <property>          unset property from the plugin configuration
        --replace <JSONObject>      erase the plugin configuration and apply JSONObject instead
    -v, --packageVersion <version>  plugin <version> to install (npm repository or git only)
    -u, --url <url>                 install plugin from a git repository or a remote tarball
    -p, --path <path>               install plugin from the file system

```

<aside class="warning">Restarting Kuzzle is required to apply any change made to plugins using the command-line interface</aside>

#### List installed plugins

<aside class="note">Installed plugins are copied into the node_modules directory of a Kuzzle server instance, even if installed from a directory path</aside>

You can get an overview of installed plugins and their activation status using the ``--list`` option:

```
./bin/kuzzle plugins --list
{ 'kuzzle-plugin-logger':
   { version: '2.0.4',
     activated: true,
     config:
      { services:
         { file:
            { outputs: { error: { level: 'warn', filename: 'kuzzle.log' } },
              addDate: true },
           stdout: { level: 'info' } } } },
  'kuzzle-plugin-auth-passport-local':
   { version: '2.0.4',
     activated: true,
     config: { secret: 'changeme', algorithm: 'sha1', digest: 'hex' } } }
```

#### Install a plugin

Kuzzle CLI supports most [npm installation methodes](https://docs.npmjs.com/cli/install).

##### from npm repositories

```shell
$ kuzzle plugins --install [--packageVersion x.y.z] name
```

If `--packageVersion` is not provided, the `latest` version will be installed.

##### from a git repository

```shell
$ kuzzle plugins --install [--packageVersion commit-ish] --url https://git.repository.url/project.git
```

The version can be anything related to commits: branch, tag, commit sha1.

If no version is provided, the `master` branch is used.

##### from a remote tarball

```shell
$ kuzzle plugins --install --url http://remote.com/plugin.tar.gz
```

<aside class="note">The tarball will be decompressed in the node_modules directory</aside>

##### from a local tarball

```shell
$ kuzzle plugins --install --path /path/to/plugin.tar.gz
```
<aside class="note">The tarball will be decompressed in the node_modules directory</aside>

##### from a local directory

```shell
$ kuzzle plgins --install --path /path/to/plugin
```

<aside class="note">The directory content will be copied in the node_modules directory</aside>

#### View plugins configuration

To view a plugin configuration, use the `--get` option.

```
$ ./bin/kuzzle plugins --get kuzzle-plugin-logger
{ npmVersion: '2.0.2',
  activated: true,
  config:
   { services:
      { file:
         { outputs:
            { error: { level: 'error', filename: 'kuzzle-error.log' },
              warning: { level: 'warn', filename: 'kuzzle-warning.log' } },
           addDate: true },
        stdout: { level: 'info', addDate: true } } } }
```

#### Modify a plugin configuration

Plugin configurations are stored in the `config` part of plugins properties.

There are multiple ways of changing a plugin configuration:

* perform a partial update, using the ``--set`` action. This allows adding or updating parts of the configuration
* replace the entire plugin configuration on the command-line, with the ``--replace`` action
* replace the entire plugin configuration by loading a JSON file, with the ``--importConfig <file>`` action

Updating a plugin configuration:

```
$ ./bin/kuzzle plugins --get kuzzle-plugin-logger
{ version: '2.0.4',
  activated: true,
  config:
   { services:
      { file:
         { outputs: { error: { level: 'warn', filename: 'kuzzle.log' } },
           addDate: true },
        stdout: { level: 'info' } } } }
$ ./bin/kuzzle plugins --set '{ "stdout": { "level": "debug"} }' kuzzle-plugin-logger
{ version: '2.0.4',
  activated: true,
  config:
   { services:
      { file:
         { outputs: { error: { level: 'warn', filename: 'kuzzle.log' } },
           addDate: true },
        stdout: { level: 'info' } },
     stdout: { level: 'debug' } } }
```

Replacing a plugin configuration on the command-line:

```
$ ./bin/kuzzle plugins --get kuzzle-plugin-logger

{ version: '2.0.4',
  activated: true,
  config:
   { services:
      { file:
         { outputs: { error: { level: 'warn', filename: 'kuzzle.log' } },
           addDate: true },
        stdout: { level: 'info' } } } }
$ ./bin/kuzzle plugins --replace '{"stdout": {"level": "debug", "addDate": true}}' kuzzle-plugin-logger

{ version: '2.0.4',
  activated: true,
  config: { stdout: { level: 'debug', addDate: true } } }
```

Replacing a plugin configuration using a JSON file:

```
$ ./bin/kuzzle plugins --importConfig foo.json kuzzle-plugin-logger
[✔] Successfully imported configuration
$ ./bin/kuzzle plugins --get kuzzle-plugin-logger
{ npmVersion: '2.0.4', activated: true, config: { foo: 'bar' } }
```


#### Removing a plugin configuration property

You can remove a plugin configuration property by using the ``--unset`` action:

```
$ ./bin/kuzzle plugins --get kuzzle-plugin-logger
{ version: '2.0.4',
  activated: true,
  config:
   { services:
      { file:
         { outputs:
            { error: { level: 'error', filename: 'kuzzle-error.log' },
              warning: { level: 'warn', filename: 'kuzzle-warning.log' } },
           addDate: true },
        stdout: { level: 'info', addDate: true } } } }
$ ./bin/kuzzle plugins --unset 'services' kuzzle-plugin-logger
  { npmVersion: '2.0.4',
    activated: true }
```
<aside class="notice">NB: Only root properties can be unset</aside>

#### Uninstalling a plugin

Plugins can be uninstalled using the ``--remove`` option.

```sh
$ kuzzle plugins --remove kuzzle-plugin-socketio
{ acknowledged: true }
```

#### Activating/Deactivating a plugin

By default, a plugin is activated when installed, meaning it will be loaded and used by Kuzzle on the next restart.

You may want to activate or deactivate a plugin, without uninstalling it.

To deactivate a plugin:

```
./bin/kuzzle plugins --deactivate kuzzle-plugin-logger
{ version: '2.0.4',
  activated: false,
  config:
   { services:
      { file:
         { outputs:
            { error: { level: 'error', filename: 'kuzzle-error.log' },
              warning: { level: 'warn', filename: 'kuzzle-warning.log' } },
           addDate: true },
        stdout: { level: 'info', addDate: true } } } }
```


To activate a plugin:

```
$ ./bin/kuzzle plugins --activate kuzzle-plugin-logger
  { version: '2.0.4',
    activated: true,
    config:
     { services:
        { file:__
           { outputs:
              { error: { level: 'error', filename: 'kuzzle-error.log' },
                warning: { level: 'warn', filename: 'kuzzle-warning.log' } },
             addDate: true },
          stdout: { level: 'info', addDate: true } } } }
```
