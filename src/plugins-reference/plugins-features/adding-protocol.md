---
layout: full.html
algolia: true
title: Adding a network protocol
order: 500
---

# Adding a network protocol

Kuzzle core only supports HTTP, Websocket and Socket.io communications natively.

<aside class="notice">
All other supported protocols are implemented by plugins, installed on the [Kuzzle Proxy](https://github.com/kuzzleio/kuzzle-proxy).
</aside>

---

## How it works

Requests sent by clients can be forwarded to Kuzzle using the [`router` accessor]({{ site_base_path }}plugins-reference/plugins-context/accessors/#router-newconnection)  
To access these methods, simply call `context.accessors.router.<router method>`:

| Router method | Arguments    | Returns | Description              |
|-----------------|--------------|---------|--------------------------|
| `newConnection` | `protocol name` (string) <br/>`connection ID` (string) | A promise resolving to a `RequestContext` object | Declares a new connection to Kuzzle. |
| `execute` | `request` ([Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object)<br/>`callback` (a callback resolved with Kuzzle's response) |  | Executes a client request. |
| `removeConnection` | `RequestContext` (obtained with `newConnection`) | | Asks Kuzzle to remove the corresponding connection and all its subscriptions |

Kuzzle Proxy expects Protocol Plugins to expose the following methods:

| Method | Arguments | Description                 |
|------|----------------|-----------------------------|
| `init` | `pluginConfiguration, context` | [Plugin initialization function]({{ site_base_path }}plugins-reference/plugins-creation-prerequisites/#plugin-init-function) |
| `joinChannel` | `{channel, id}`| Tells Protocol Plugins that the connection `id` subscribed to the channel `channel` |
| `leaveChannel` | `{channel, id}` | Tells Protocol Plugins that the connection `id` left the channel `channel` |
| `notify` | `{channels, id, payload}` | Asks Protocol Plugins to emit a data `payload` (JSON Object) to the connection `id` (string), on the channels  `channels` (array of strings)|
| `broadcast` | `{channels, payload}` | Asks Protocol Plugins to emit a data `payload` (JSON Object) to clients connected to the channels list `channels` (array of strings) |
| `disconnect` | `id` | Asks protocol plugins to force-close the connection `id` |

The connection `id` Kuzzle sends to Plugins is the one declared by Protocol Plugins using `context.accessors.router.newConnection`.

*For more information about channels, see our [API Documentation]({{ site_base_path }}api-documentation/controller-realtime/subscribe)*

---

## TL;DR plugin skeleton

```javascript
function ProtocolPlugin () {
  this.pluginContext = null;

  // Example on how to maintain client contexts
  this.clients = {};

  /*
   Required plugin initialization function
   (see the "Plugin prerequisites" section)
  */
  this.init = function (customConfig, context) {
    // plugin initialization
    this.pluginContext = context;
  };

  /*
   This function is only an example showing how to interact with
   clients and with Kuzzle. It does not implement any actual protocol.

   The way a protocol plugins handles clients closely depends on the
   implemented protocol.
   */
  this.handleClient = function () {
    // when a client connects
    this.on('onClientConnect', function (connectionId) {
      this.pluginContext.accessors.router.newConnection("protocol name", connectionId)
        .then(context => {
          this.clients[connectionId] = context;
        });
    });

    // when a client sends a request
    this.on('onClientRequest', function (connectionId, data) {
      // Instantiates a Request object to be passed to Kuzzle
      let request = new Request(data, this.clients[connectionId]);

      this.pluginContext.accessors.router.execute(request, response => {
        // forward the response to the client
      });
    });

    // whenever a client is disconnected
    this.on('onClientDisconnect', function (connectionId) {
      this.pluginContext.accessors.router.removeConnection(this.clients[connectionId]);
      delete this.clients[connectionId];
    });
  };

  /*
   Invoked by Kuzzle when a "data.payload" payload needs to be
   broadcasted to the "data.channels" channels

   The payload is a Kuzzle response as a plain-old JSON object
  */
  this.broadcast = function (data) {
    data.channels.forEach(channel => {
      // sends data.payload to the channel
    });
  };

  /*
   Invoked by Kuzzle when a "data.payload" payload needs to be
   notified to the connection "data.id", on the "data.channels" channels

   The payload is a Kuzzle response as a plain-old JSON object
  */
  this.notify = function (data) {
    data.channels.forEach(channel => {
      // sends "data.payload" to the connection "data.id" and to
      // the channel "channel"
    });
  };

  /*
    Invoked by Kuzzle when the connection "data.id" joins the
    channel "data.channel"
   */
  this.joinChannel = function (data) {
     // ...
  };

  /*
    Invoked by Kuzzle when the connection "data.id" leaves the
    channel "data.channel"
   */
  this.leaveChannel = function (data) {
    // ...
  };

  /*
    Invoked by Kuzzle when it needs to force-close a client connection
   */
  this.disconnect = function (id) {
    // close the connection opened by the connection "id"
  };
};

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = ProtocolPlugin;
```
