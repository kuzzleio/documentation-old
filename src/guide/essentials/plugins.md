---
layout: full.html.handlebars
algolia: true
title: Kuzzle's Plugin Engine
order: 1100
---

# Kuzzle's Plugin Engine

Our prepackaged multi-feature backend solution will meet most project requirements, but in some cases you may want to **implement your own business logic**.

For example, imagine you are developing a mobile application that accesses a **third-party payment platform**, such as Braintree, through this third-party's API. For **security** reasons, you will want to avoid accessing the third-party's API directly from the mobile device. Also, you will not want users to purchase more items than are currently in stock, so your backend will need to **monitor** what has been purchased. To achieve all this, you will want to develop a custom Plugin that lets Kuzzle communicate directly with the third-party payment platform.

Kuzzle's **[Plugin Engine]({{ site_base_path }}plugins-reference)** is a powerful feature that ensures that Kuzzle meets any project requirement:

* select from a set of prebuilt plugins (such as the [OAuth2 Authentication Plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth) or the [MQTT Plugin](https://github.com/kuzzleio/kuzzle-plugin-mqtt)).
* [create your own plugin]({{ site_base_path }}plugins-reference/plugins-features) to meet your specific requirements.

---

## Plugin Types

There are three main Plugin types: core, worker and protocol. Each of these Plugin types have their own components.

### Core Plugins

Core plugins are the most common type of Plugin and are used to add extended functionality to your Kuzzle installation. They are loaded into Kuzzle during startup and share its execution thread. A Core Plugin can add the following components:

[Hooks]({{ site_base_path }}plugins-reference/plugins-features/adding-hooks): add an asynchronous listener that performs operations triggered by data events. When the event occurs, the data is sent to the listener and Kuzzle continues its process without waiting for the callback to complete.

  _Example - "Write a log to a third-party logging service every time a document is deleted"_. The [Logger Plugin](https://github.com/kuzzleio/kuzzle-plugin-logger) (shipped with Kuzzle) uses this feature to log all the data-related events.

[Pipes]({{ site_base_path }}plugins-reference/plugins-features/adding-pipes): add a synchronous listener that performs operations triggered by data events. Multiple synchronous listeners can be chained sequentially. When the event occurs, the data is passed through the series of synchronous listeners, each modifying the input data and returning the result to the next listener. Kuzzle waits until the last listener completes and returns its data. If the last listener returns a standard error, it will interrumpt the Kuzzle lifecycle.

  _Example - "Compare the ordered quantity with the available stock and return an error if the amount of ordered items exceeds the amount in stock"_.

[Controllers & Routes]({{ site_base_path }}plugins-reference/plugins-features/adding-controllers): add a route to expose new entries in the API.

  _Example - "Expose a `checkout` API endpoint that handles a third-party payment process"_.

[Strategies]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy): add an authentication strategy to identify and authenticate users.

  _Example - "Enable OAuth based authentication in Kuzzle"_
  Kuzzle Community Edition ships with the [Local Strategy Plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local) and thanks to PassportJS, more than 300 authentication strategies are readily available.

### Worker Plugins

[Worker Plugins]({{ site_base_path }}plugins-reference/plugins-features/adding-hooks/#executing-hooks-in-separate-threads) are similar to Core Plugins but, unlike Core Plugins, they run in a separate execution thread than that of Kuzzle they're installed on . They are limited to the asynchronous processing functionality outlined above and are particularly useful when performing compute-intensive operations that would otherwise impact Kuzzle's performance.

_Example - "Compute a complex data-mining operation and commit the result to a third-party platform every time a document is changed"._

### Protocol Plugins

[Protocol Plugins]({{ site_base_path }}plugins-reference/plugins-features/adding-protocol) add extended networking capabilities to your Kuzzle installation. These are useful if you need to handle various transport protocols.

_Example - "Allow Kuzzle to interact with XMPP-oriented services"_
Kuzzle Community Edition ships with the [MQTT Plugin](https://github.com/kuzzleio/kuzzle-plugin-mqtt).

---

## Installing a Plugin

<aside class="notice">
If you are running Kuzzle in a Docker container, you will need to access the running container's shell and then the Kuzzle installation folder inside the container.
</aside>

To install a Plugin, you need to make it accessible in the `plugins/enabled` folder of your Kuzzle installation.  

A common practice is to first copy the Plugin to a `plugins/available` folder, and then creating a symbolic link from that folder to the `plugins/enabled` folder. This way, you can easily enable and disable a Plugin just by creating or deleting a symbolic link, respectively.

Prior to loading the Plugin into Kuzzle, you will need to load all of the Plugin depencies by running `npm install` from within the Plugin folder.

To demonstrate, we are going to install the [**Core Plugin Boilerplate**](https://github.com/kuzzleio/kuzzle-core-plugin-boilerplate), a Plugin that uses all features available to a Core Plugin.


Go to the Kuzzle installation folder and type:


```bash
# Open plugins/available folder
cd "plugins/available"

# Download Plugin to plugins/available folder
git clone https://github.com/kuzzleio/kuzzle-core-plugin-boilerplate.git

# Install the Plugin dependencies
npm install

# Open plugins/enabled folder
cd "../../enabled"

# Creata the symbolic link from the enabled folder to the available folder
ln -s "../available/kuzzle-core-plugin-boilerplate" .

# Restart Kuzzle to reload Plugins
pm2 restart kuzzlebackend
```

---

Once Kuzzle has restarted, check the server information at `http://localhost:7512/?pretty=true` to confirm that the Plugin has been installed. You should now see the `kuzzle-core-plugin-boilerplate` Plugin entry:

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

Note that the Plugin description above contains a property for each Core Plugin component:
- `hooks` asynchronous operations that depend on data-related events
- `pipes` synchronous operations that depend on data-related events
- `controllers` list of exposed actions in the API
- `routes` list of exposed actions in the **REST** API
- `strategies` list of exposed authentication strategies


---

## Managing Plugins

To learn more about how to manage or configure plugins, please check our [Plugin Reference Documentation]({{ site_base_path }}plugins-reference/managing-plugins).

---

## Going Further

To get more insight into how plugins work, please refer to the [Plugin Reference]({{ site_base_path }}plugins-reference).

Here is a list of official plugins:
- [**kuzzle-plugin-auth-passport-local**](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local): authentication Plugin shipped with Kuzzle
- [**kuzzle-plugin-logger**](https://github.com/kuzzleio/kuzzle-plugin-logger): worker Plugin shipped with Kuzzle
- [**kuzzle-plugin-auth-passport-oauth**](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth): authentication plugin
- [**kuzzle-plugin-mqtt**](https://github.com/kuzzleio/kuzzle-plugin-mqtt): protocol plugin

To find more plugins, search the `kuzzle-plugin` topic on [github](https://github.com/search?q=topic%3Akuzzle-plugin&type=Repositories)
