---
layout: full.html
algolia: true
title: The Plugin System
order: 1000
---

# The Plugin System

Being able to grab a full-feature backend and run it quickly is very convenient, but Kuzzle is about more than that. As soon as you start developing real-life applications that live out in the wild, you need to **extend your backend with your own business-logic**.
That's quite legitimate: some logic is sensible and cannot live on the client.

For example, imagine your application needs to leverage a **third-party payment system**, such as Braintree. You don't want to put the client in charge of bearing API keys and tokens. Also, you will probably want to **keep track of orders** and payments, once the transactions successfully end. This should be also a concern of your backend. Also, you are not likely to allow your customers to purchase more items than available, right? At some point, **your backend has to validate the transaction** by comparing the ordered quantity with the available stocks.

To make sure Kuzzle fits whatever needs you might have, it includes a powerful **[Plugin System]({{ site_base_path }}plugins-reference)** allowing you to add features to your server in a modular fashion. With Kuzzle Plugins you can:

* use an existing plugin from the Kuzzle Plugins ecosystem (such as the [OAuth2 Authentication strategy](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth) or the [MQTT Protocol](https://github.com/kuzzleio/kuzzle-plugin-mqtt));
* [create your own plugin]({{ site_base_path }}plugins-reference/plugins-features) from scratch.

---

## Plugin Types

There are three main Plugin types, each one has specific features.

### Core Plugins

They are the most common type of plugins and are meant to extend the Kuzzle Core features. They are plugged on the Kuzzle Core at startup and they share its execution thread. A Core Plugin can extend Kuzzle with the following features:

[Listen asynchronously]({{ site_base_path }}plugins-reference/plugins-features/adding-hooks), and perform operations that depend on data-related events. The chunk of data involved with the event is passed to the triggered callback, but the Kuzzle Core continues its execution without waiting for the callback to return.

  _Example - "Write a log to a third-party log system every time a document is deleted"_. The [Logger Plugin](https://github.com/kuzzleio/kuzzle-plugin-logger), shipped with Kuzzle, uses this feature to log all the data-related events.

[Listen synchronously]({{ site_base_path }}plugins-reference/plugins-features/adding-pipes), and perform operations that depend on data-related events. Multiple synchronous listeners can be chained, forming a pipeline. The chunk of data involved with the event is passed to one plugin to another in the pipeline, and it can be modified. The Kuzzle Core waits for the pipeline to return and receives then processes the potentially modified value. A plugin can even stop a request life-cycle, by returning a standard Error to the Kuzzle Core.

  _Example - "Compare the ordered quantity with the available stocks and return an error if the amount of ordered items exceeds the stocks"_.

[Add a controller route]({{ site_base_path }}plugins-reference/plugins-features/adding-controllers) to expose new actions to the API.

  _Example - "Expose a `checkout` API endpoint that handles the Braintree payment process"_.

[Add an authentication strategy]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy) to the User authentication system.

  _Example - "Enable Kuzzle to authenticate users via the OAuth strategy"_
  Kuzzle ships with an Authentication Plugin already bundled in its Community Edition, the [Local Strategy Plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local). Thanks to PassportJS, more than 300 authentication strategies are readily available.

### Worker Plugins

[Workers Plugins]({{ site_base_path }}plugins-reference/plugins-features/adding-hooks/#executing-hooks-in-separate-threads) are Core Plugins running on separate processes. The only feature they can add is to asynchronously listen to data-related events. They are useful when performing costly operations as they have no impact on Kuzzle performances.

_Example - "Compute a complex data-mining operation and commit the result to a third-party Business-Intelligence platform every time a document is changed"._

### Protocol Plugins

[Protocol Plugins]({{ site_base_path }}plugins-reference/plugins-features/adding-protocol) extend Kuzzle networking capabilities by adding new network protocols.

_Example - "Enable Kuzzle to interact with XMPP-oriented services"_
Kuzzle ships with a Protocol Plugin already bundled in its Community Edition, the [MQTT Plugin](https://github.com/kuzzleio/kuzzle-plugin-mqtt).

---

## How to install Plugin

<aside class="notice">
If you are running Kuzzle in a Docker container, you will need to enter the container to access the installation directory.
</aside>

To install a Plugin, you just need to make it accessible within the `plugins/enabled` directory (relative to the path of the Kuzzle installation directory).  
A common practice is to copy the Plugin code in the `plugins/available` directory, and to create a symbolic link in `plugins/enabled` pointing to it. This way, enabling and disabling a plugin is just a matter of creating or deleting a symbolic link.


We are going to install the [**Core Plugin Boilerplate**](https://github.com/kuzzleio/kuzzle-core-plugin-boilerplate), which demonstrates each feature of a Core Plugin:

- [listen asynchronously]({{ site_base_path }}plugins-reference/plugins-features/adding-hooks), and perform operations that depend on data-related events;
- [listen synchronously]({{ site_base_path }}plugins-reference/plugins-features/adding-pipes), and approve, modify and/or reject data-related queries;
- [add a controller route]({{ site_base_path }}plugins-reference/plugins-features/adding-controllers) to expose new actions to the API;
- [add an authentication strategy]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy) to Kuzzle.


Go to the Kuzzle installation directory and type:


```bash
#!/bin/bash

cd "plugins/available"
git clone https://github.com/kuzzleio/kuzzle-core-plugin-boilerplate.git

cd "../enabled"
ln -s "../available/kuzzle-core-plugin-boilerplate" .

# Restart Kuzzle to reload Plugins
pm2 restart KuzzleServer
```

---

## Check your plugin installation

Once Kuzzle has restarted you can check the server information at `http://localhost:7512/?pretty=true` which contains the new `kuzzle-core-plugin-boilerplate` plugin entry:

```json
{
  "...": "...",

  "result": {
    "serverInfo": {
      "kuzzle": {

        "...": "...",

        "plugins": {

          "...": "...",

          "kuzzle-core-plugin-boilerplate": {
            "name": "kuzzle-core-plugin-boilerplate",
            "hooks": [
              "document:beforeCreateOrReplace",
              "document:beforeReplace",
              "document:beforeUpdate"
            ],
            "pipes": [
              "document:beforeCreate",
              "realtime:beforePublish"
            ],
            "controllers": [
              "kuzzle-core-plugin-boilerplate/myNewController"
            ],
            "routes": [
              {
                "verb": "get",
                "url": "/kuzzle-core-plugin-boilerplate/say-something/:property",
                "controller": "myNewController",
                "action": "myNewAction"
              },
              {
                "verb": "post",
                "url": "/kuzzle-core-plugin-boilerplate/say-something",
                "controller": "myNewController",
                "action": "myNewAction"
              }
            ],
            "strategies": [
              "dummy"
            ]
          }
        }
      }
    }
  }
}
```

Here you can see what your plugin has registered:
- `hooks` asynchronous operations that depend on data-related events
- `pipes` synchronous operations that depend on data-related events
- `controllers` list of exposed actions to the API
- `routes` list of exposed actions to the **REST** API
- `strategies` list of exposed authentication strategies


---

## Managing Plugins

To learn about how to manage or configure plugins, please check our [Plugin reference documentation]({{ site_base_path }}plugins-reference/managing-plugins).

---

## Going further

To get a deeper insight on how Plugins work in Kuzzle, please refer to the [Plugin Reference]({{ site_base_path }}plugins-reference).

Here is a list of officials Plugins:
- [**kuzzle-plugin-auth-passport-local**](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local): shipped with Kuzzle installation, authentication plugin
- [**kuzzle-plugin-logger**](https://github.com/kuzzleio/kuzzle-plugin-logger): shipped with Kuzzle installation, worker plugin
- [**kuzzle-plugin-auth-passport-oauth**](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth): authentication plugin
- [**kuzzle-plugin-mqtt**](https://github.com/kuzzleio/kuzzle-plugin-mqtt): protocol plugin

You also can search for `kuzzle-plugin` topic on [github](https://github.com/search?q=topic%3Akuzzle-plugin&type=Repositories)
