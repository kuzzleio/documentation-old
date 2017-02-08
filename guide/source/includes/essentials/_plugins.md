## The Plugin System

Being able to grab a full-feature backend and run it quickly is very convenient, but Kuzzle is about more than that. As soon as you start developing real-life applications that live out in the wild, you need to **extend your backend with your own business-logic**.
That's quite legitimate: some logic is sensible and cannot live on the client.

For example, imagine your application needs to leverage a **third-party payment system**, such as Braintree. You don't want to put the client in charge of bearing API keys and tokens. Also, you will probably want to **keep track of orders** and payments, once the transactions successfully end. This should be also a concern of your backend. Also, you are not likely to allow your customers to purchase more items than available, right? At some point, **your backend has to validate the transaction** by comparing the ordered quantity with the available stocks.

To solve this problem, Kuzzle ships with a powerful **[Plugin System](/plugin-reference)** that enables you to add features to your server in a modular fashion. With Kuzzle Plugins you can

* use an existing plugin from the Kuzzle Plugins ecosystem (such as the [OAuth2 Authentication strategy](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth) or the [MQTT Protocol](https://github.com/kuzzleio/kuzzle-plugin-mqtt));
* [create your own plugin](/plugin-reference/#writing-plugin-code) from scratch.

### Plugin Types

There are three main Plugin types, each one has specific features.

#### Core Plugins

They are the most common type of plugins and are meant to extend the Kuzzle Core features. They are plugged on the Kuzzle Core at startup and execute on its same thread. A Core Plugin can extend Kuzzle with the following features:

[Listen asynchronously](/plugin-reference#listener-plugins), and perform operations that depend on data-related events. The chunk of data involved with the event is passed to the triggered callback, but the Kuzzle Core continues its execution without waiting for the callback to return, nor receiving the return value of the callback.

  _Example - "Write a log to a third-party log system every time a document is deleted"_. The [Logger Plugin](https://github.com/kuzzleio/kuzzle-plugin-logger), shipped with Kuzzle, uses this feature to log all the data-related events.

[Listen synchronously](/plugin-reference#pipe-plugins), and perform operations that depend on data-related events. many synchronous listeners can be chained, forming a pipeline. The chunk of data involved with the event is passed to the plugin pipeline and can be modified. The Kuzzle Core waits for the pipeline to return and receives the returned value (which must be the processed chunk of data). The pipeline can even stop a request life-cycle, returning a standard Error to the Kuzzle Core.

  _Example - "Compare the ordered quantity with the available stocks and return an error if ordered is greater than stocks"_.

[Add a controller route](/plugin-reference#controllers) to expose new actions to the API.

  _Example - "Expose a `checkout` API endpoint that handles the Braintree payment process"_.

[Add an authentication strategy](/plugin-reference#authentication-plugin) the User authentication system.

  _Example - "Enable Kuzzle to authenticate users via the OAuth strategy"_
  Kuzzle ships with an Authentication Plugin already bundled in its Community Edition, the [Local Strategy Plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local).

#### Worker Plugins
[Workers Plugins](/plugin-reference#worker-plugins) are Core Plugins that run on a separate process. The only feature they can add is to [asynchronously listen to data-related events](/plugin-reference#listener-plugins). They are useful when performing costly operations as they have no impact on Kuzzle performances.

_Example - "Compute a complex data-mining operation and commit the result to a third-party Business-Intelligence platform every time a document is changed"._

#### Protocol Plugins
[Protocol Plugins](/plugin-reference#protocol-plugins) extend Kuzzle networking capabilities by adding new network protocols.

_Example - "Enable Kuzzle to interact with XMPP-oriented services"_
Kuzzle ships with a Protocol Plugin already bundled in its Community Edition, the [Websocket Plugin](https://github.com/kuzzleio/kuzzle-plugin-websocket).

### Examples

This example is a very dummy one. We are going to install the **Hello World Controller Plugin**, which opens a new API endpoint that simply... Greets the client! Not very useful, except for the sake of this example.

In Kuzzle, you can use the CLI to manage your Plugins. The `plugins --install` command enables you to install a Plugin from a Git repository, an NPM package or a local path on your machine.

<aside class="notice">
If you are running Kuzzle in a Docker container, you will need to enter the container to use the CLI.
</aside>

Go to the Kuzzle installation directory and type:

```bash
$ bin/kuzzle plugins --install --url https://github.com/kuzzleio/kuzzle-plugin-helloworld.git
$ pm2 restart KuzzleServer
```

Once Kuzzle has restarted (that's what the second command is for) you can check the server information at `http://localhost:7512/?pretty=true` for the new `hello` endpoint:

```json
{
    ...
    "result": {
        "serverInfo": {
            "kuzzle": {
                ...
                "api": {
                    "routes":
                    ...
                    "kuzzle-plugin-helloworld/hello": {
                      "sayHello": {
                        "name": "sayHello"
                      }
                    }
                }
            }
        }
    }
}

```

Which means you can call the `http://localhost:7512/kuzzle-plugin-helloworld/hello/` route and get the following response:

```json
{
  "requestId": "66265614-e908-4a91-a492-135e40e64aa3",
  "status": 200,
  "error": null,
  "controller": "kuzzle-plugin-helloworld/hello",
  "action": "sayHello",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "Hello world"
}
```

To get a deeper insight on how Plugins work in Kuzzle, please refer to the [Plugin Reference](/plugin-reference).

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
