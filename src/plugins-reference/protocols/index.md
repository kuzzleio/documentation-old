---
layout: full.html
words: 984
algolia: true
title: Protocols
description: Extend Kuzzle communication capabilities
order: 500
---

# Protocols

By default, Kuzzle supports HTTP, Websocket and Socket.io protocols.

Kuzzle can be extended with custom protocols to support more type of entries.

--- 

## Install 

Installing a protocol is very similar to [plugins]({{ site_base_path }}plugins-reference/managing-plugins/#installing-removing-enabling-and-disabling-plugins)

The only difference is that protocols need to be installed in `protocols/enabled` directory.

--- 

## Configure 

Protocols are configured within [Kuzzle configuration]({{ site_base_path }}guide/essentials/configuration/), under the `server/protcols/<protocol name>` section.

Example:  
*.kuzzlerc*
```json
{
  "server": {
    "protocols": {
      "mqtt": {
        "port": 1883,
        "allowPubSub": true
      }
    }
  }
}
```

The example above will be taken into account by [Kuzzle MQTT protocol](https://github.com/kuzzleio/protocol-mqtt);

---

## Build your own

Protocols are constructors exposed in a nodejs module.

Protocols must implement the following methods:

| Method | Arguments | Description                 |
|------|----------------|-----------------------------|
| `broadcast` | `{channels, payload}` | Asks Protocol Plugins to emit a data `payload` (pojo object) to clients connected to the channels list `channels` (array of strings) |
| `disconnect` | `connectionId` | Asks protocol plugins to force-close the connection `connectionId` |
| `init` | `proxy` | [Plugin initialization function](#init) |
| `joinChannel` | `channel`, `connectionId`| Tells Protocol Plugins that the connection `connectionId` subscribed to the channel `channel` |
| `leaveChannel` | `channel`, `connectionId` | Tells Protocol Plugins that the connection `connectionId` left the channel `channel` |
| `notify` | `{channels, connectionId, payload}` | Asks Protocol Plugins to emit a data `payload` (pojo object) to the connection `connectionId` (string), on the channels  `channels` (array of strings)|

### init

`init ({EntryPoint} entryPoint, {Object} context)`

return value: `void` or `Promise`. If the returned value is a promise, Kuzzle will wait till it is resolved to continue starting.

--- 

## Available objects reference

### ClientConnection

ClientConnection objects *must* be given to the [`entryPoint.newConnection`](#execute-method) method. Their auto-generated `id` must be used wherever a `connectionId`is required.
The [`ClientConnection` constructor](https://github.com/kuzzleio/kuzzle/blob/no-proxy/lib/api/core/entrypoints/embedded/clientConnection.js) is exposed in the `context` object passed to the protocol `init` method.

#### constructor

`new context.ClientConnection(protocol, ips, headers)`

* `protocol`: {string} the protocol identifier (= `this.protocol`)
* `ips`: {array of strings} list of forwarded ip addresses (or any client connection information) of the connection. In http, will contain the ip addresses from [`X-Forwarded-For`](https://en.wikipedia.org/wiki/X-Forwarded-For) header.
* `headers`: [Optional] {object} A set of key/value pairs that can contain any extra information

---
### context instance

The `context` instance is passed to the protocol `init` method.

It contains useful functions and objects not directly related to the protocol communication.

#### constructors

* [`ClientConnection`](#clientconnection)
* [`Request`](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/lib/request.js)

#### utils

* `errors`: An object containing [Kuzzle error constructors](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/lib/errors/index.js)
* `log`: An set of `level` log functions. `level` values are: [`silly`, `verbose`, `debug`, `info`, `warn`, `error`]

ex: `context.log.error(new context.errors.InternalError('something went bad'))`

---

### EntryPoint

#### config property

type: `pojo object`

Contains Kuzzle configuration `server` subtree. The user configuration for the protocol can potentially be found under `entryPoint.config.protocols[protocolName]`.

#### execute method

`execute(request, callback)`

* `request` <br>{[`Request`](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/lib/request.js)} The `Request` constructor is exposed in the [`context`](#context-instance) object given to the `init` method.<br>The request **must** be constructed with a valid request context, including the `connectionId` and the protocol (cf example below).
* `callback` <br>{Function} The callback to be executed when Kuzzle gets the result.<br>Takes one `response` argument, being the result of [`RequestResponse.toJSON()`](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/lib/models/requestResponse.js).

example:

```js
const request = new context.Request({
  controller: 'server',
  action: 'now'
}, {
  connectionId: 'current connection Id',
  protocol: this.protocol
});

entryPoint.execute(request, response => {
  console.log(response.content);
});
```

#### newConnection method

`newConnection(connection)`

return value: none

* `connection` {[`ClientConnection`](#clientconnection)}.

#### removeConnection method

`removeConnection(connectionId)`

return value: none

* `connectionId`: {string} the `ClientConnection` auto generated id to remove.

---

## TL;DR custom protocol skeleton

```javascript
class MyProtocol {
  constructor () {
    this.context = null;
    
    // [Mandatory] will be used a protocol name by Kuzzle
    this.protocol = 'myProtocol';

    // Example on how to maintain client connections
    this.clients = {};
    this.connections = {};
  }

  /** 
  * [Required]
  * 
  * @param {EntryPoint} entryPoint - main protocol interface with Kuzzle
  * @param {object} context - Constructors and utilities
  */
  init (entryPoint, context) {
    // plugin initialization
    this.entryPoint = entryPoint;
    this.context = context;
    
    // user configuration can be retrived from entryPoint.config[protcol name]
    this.config = Object.assign({
      default: 'value'
    }, entryPoint.config[this.protocol] || {});
  }

  /*
   This function is only an example showing how to interact with
   clients and with Kuzzle. It does not implement any actual protocol.

   The way a protocol plugins handles clients closely depends on the
   implemented protocol.
   */
  handleClient () {
    // when a client connects
    this.on('onClientConnect', client => {

      const connection = new context.constructor.ClientConnection(this.protocol, [client.connection.stream.remoteAddress], {some: 'header'});
      this.entryPoint.newConnection(connection);

      this.clients[connection.id] = client;
      this.connections[client.id] = connection;
    });

    // when a client sends a request
    this.on('onClientRequest', (client, data) => {
      // Instantiates a Request object to be passed to Kuzzle
      const
        connection = this.connections[client.id],
        request = new this.context.Request(data, {
          connectionId: connection.id,
          protocol: this.protocol
        });

      this.entryPoint.execute(request, response => {
        // forward the response to the client
      });
    });

    // whenever a client is disconnected
    this.on('onClientDisconnect', client => {
      const connection = this.connections[client.id];

      this.entryPoint.removeConnection(connection.id);
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
    Invoked by Kuzzle when the connection "connectionId" joins the
    channel "channel"
   */
  joinChannel (channel, connectionId) {
     // ...
  }

  /*
    Invoked by Kuzzle when the connection "connectionId" leaves the
    channel "channel"
   */
  leaveChannel (channel, connectionId) {
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
module.exports = MyProtocol;
```
