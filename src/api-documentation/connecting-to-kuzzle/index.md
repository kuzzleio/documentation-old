---
layout: full.html
algolia: true
title: Connecting to Kuzzle
description: through HTTP, WebSocket or Protocol plugins
order: 100
---


# Connecting to Kuzzle

The connection to Kuzzle depends on the protocol to be used.

HTTP, WebSocket and SocketIO protocols are shipped in Kuzzle's core.
Other protocols can be added with [Protocol Plugins]({{ site_base_path }}plugins-reference).

---

## HTTP

By default, Kuzzle exposes itself on the 7512 port. Assuming the Kuzzle server runs locally,
it can be reached on `http://localhost:7512/`.

The default response is the [ServerInfo]({{ site_base_path }}api-documentation/controller-server/info) controller.
With this you will get detailed information about available HTTP API routes.

### Examples

```bash
#!/bin/bash

curl "http://localhost:7512/"
```

---

## WebSocket

By default, Kuzzle enables the core websockets protocol,
accepting websocket requests via the http server (on port 7512 by default).

### Examples

```html
<script>
    var socket = new WebSocket("ws://localhost:7512");
</script>
```

---

## Socket.io (WebSocket-like)

To ensure compatibility with older web browsers, our official docker images embeds the
Kuzzle embeds a socketio protocol, accepting socket requests via the http server (on port 7512 by default).


### Examples

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
<script>
    var socket = io("http://localhost:7512");
</script>
```


---

## MQTT protocols

Kuzzle provides a [plugin protocol](https://github.com/kuzzleio/kuzzle-plugin-mqtt) that supports the MQTT protocol.
This plugin protocol is a 2-way means of communication between your application and Kuzzle, forwarding your queries
forth to Kuzzle, and notifications/responses from Kuzzle back to your application.


### Examples


```bash
#!/bin/bash

# shell 1
node_modules/.bin/mqtt subscribe -v -h rabbit -t Kuzzle

# shell 2
node_modules/.bin/mqtt publish -h rabbit -t Kuzzle -m '{
  "collection":"index",
  "collection":"collection",
  "controller": "document",
  "action": "createOrReplace",
  "body": {
    "firstName": "John",
    "lastName": "Doe"
  }
}'

# shell 1 (prettified)
Kuzzle {
  "error": null,
  "result": {
    "_id": "AVF8NG3k5ZVpUuiPrN1K",
    "_index": "index",
    "_source": {"firstName":"John", "lastName":"Doe"},
    "_type": "collection",
    "_version": 1,
    "action": "createOrReplace",
    "collection": "collection",
    "controller": "document",
    "created": true,
    "volatile": {},
    "requestId":"5cb4d930-62f4-4393-afc1-9a71e284a214"
  },
  "status": 200
}
```

By default, the MQTT plugin protocol listens on the port 1883.

<aside class="notice">
    The examples given in this documentation use the cli client from the mqtt node.js
    library that is shipped within the Kuzzle Docker container.<br />
    You can play them by entering the kuzzle container. Once your docker compose stack is running:<br />
    <code>docker exec -ti kuzzle_kuzzle_1 bash</code>
</aside>
