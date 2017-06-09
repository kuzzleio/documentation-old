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

| Router method | Arguments    | Description              |
|-----------------|--------------|---------|--------------------------|
| `newConnection` | `connection` ([ClientConnection]({{ site_base_path }}plugins-reference/plugins-context/constructors/#clientconnection) object) | Declares a new connection to Kuzzle. |
| `execute` | `{payload, connectionId, protocol, headers}`<br/>`callback` (a callback resolved with Kuzzle's response) | Executes a client request. |
| `removeConnection` | `connectionId` | Asks Kuzzle to remove the corresponding connection and all its subscriptions |

Kuzzle Proxy expects Protocol Plugins to expose the following methods:

| Method | Arguments | Description                 |
|------|----------------|-----------------------------|
| `init` | `proxy` | [Plugin initialization function]({{ site_base_path }}plugins-reference/plugins-creation-prerequisites/#plugin-init-function) |
| `joinChannel` | `{channel, connectionId}`| Tells Protocol Plugins that the connection `connectionId` subscribed to the channel `channel` |
| `leaveChannel` | `{channel, connectionId}` | Tells Protocol Plugins that the connection `connectionId` left the channel `channel` |
| `notify` | `{channels, connectionId, payload}` | Asks Protocol Plugins to emit a data `payload` (JSON Object) to the connection `connectionId` (string), on the channels  `channels` (array of strings)|
| `broadcast` | `{channels, payload}` | Asks Protocol Plugins to emit a data `payload` (JSON Object) to clients connected to the channels list `channels` (array of strings) |
| `disconnect` | `connectionId` | Asks protocol plugins to force-close the connection `connectionId` |


*For more information about channels, see our [API Documentation]({{ site_base_path }}api-documentation/controller-realtime/subscribe)*

---

## TL;DR plugin skeleton

```javascript
class ProtocolPlugin {
  constructor () {
    this.context = null;

    // Example on how to maintain client connections
    this.clients = {};
    this.connections = {};
  }

  /*
   Required plugin initialization function
   (see the "Plugin prerequisites" section)
  */
  init (config, context) {
    // plugin initialization
    this.context = context;
  }

  /*
   This function is only an example showing how to interact with
   clients and with Kuzzle. It does not implement any actual protocol.

   The way a protocol plugins handles clients closely depends on the
   implemented protocol.
   */
  handleClient () {
    // when a client connects
    this.on('onClientConnect', function (client) {

      const connection = new context.constructor.ClientConnection('myProtocol', [client.connection.stream.remoteAddress], {some: 'header'});

      this.context.accessors.router.newConnection(connection);
      this.clients[connection.id] = client;
      this.connections[client.id] = connection;
    });

    // when a client sends a request
    this.on('onClientRequest', function (client, data) {
      // Instantiates a Request object to be passed to Kuzzle
      const
        connection = this.connections[client.id],
        request = {
          payload: data,
          connectionId: connection.id,
          protocol: 'myProtocol',
          headers: {some: 'headers'}
        };

      this.context.accessors.router.execute(request, response => {
        // forward the response to the client
      });
    });

    // whenever a client is disconnected
    this.on('onClientDisconnect', function (client) {
      const connection = this.connections[client.id];

      this.context.accessors.router.removeConnection(connection.id);
      delete this.clients[connection.id];
      delete this.connections[client.id];
    });
  }

  /*
   Invoked by Kuzzle when a "data.payload" payload needs to be
   broadcasted to the "data.channels" channels

   The payload is a Kuzzle response as a plain-old JSON object
  */
  broadcast (data) {
    data.channels.forEach(channel => {
      // sends data.payload to the channel
    });
  }

  /*
   Invoked by Kuzzle when a "data.payload" payload needs to be
   notified to the connection "data.id", on the "data.channels" channels

   The payload is a Kuzzle response as a plain-old JSON object
  */
  notify (data) {
    data.channels.forEach(channel => {
      // sends "data.payload" to the connection "data.id" and to
      // the channel "channel"
    });
  }

  /*
    Invoked by Kuzzle when the connection "data.id" joins the
    channel "data.channel"
   */
  joinChannel (data) {
     // ...
  }

  /*
    Invoked by Kuzzle when the connection "data.id" leaves the
    channel "data.channel"
   */
  leaveChannel (data) {
    // ...
  }

  /*
    Invoked by Kuzzle when it needs to force-close a client connection
   */
  disconnect (connectionId) {
    const client = this.clients[connectionId];
    // close the client connection
  }
}

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = ProtocolPlugin;
```
