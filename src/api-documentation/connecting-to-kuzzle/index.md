---
layout: full.html.hbs
algolia: true
title: Connecting to Kuzzle
description: Connecting to Kuzzle using HTTP, WebSocket or Protocol plugins
order: 100
---


# Connecting to Kuzzle

A connection to Kuzzle can be made using different protocols. Currently Kuzzle ships with HTTP, WebSocket and Socket.io, but you can add other protocols using the [Protocol Plugins]({{ site_base_path }}plugins-reference).

---

## HTTP

By default, Kuzzle can be reached via HTTP on port 7512. Thus, assuming the Kuzzle server is running locally,
it can be reached at `http://localhost:7512/`.

The default response for the root endpoint is the [ServerInfo]({{ site_base_path }}api-documentation/controller-server/info), which gives detailed information about the available HTTP API routes.

### Examples

```bash
curl "http://localhost:7512/"
```

---

## WebSocket

By default, Kuzzle has websockets enabled, accepting requests via the http server on port 7512.

### Examples

```html
<script>
    var socket = new WebSocket("ws://localhost:7512");
</script>
```

---

## Socket.io

To ensure compatibility with older web browsers, our official Kuzzle docker images embed the socketio protocol, accepting socket requests via the http server on port 7512.


### Examples

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
<script>
    var socket = io("http://localhost:7512");
</script>
```


---

## MQTT protocol

Kuzzle provides a plugin that supports the [MQTT protocol](https://github.com/kuzzleio/protocol-mqtt).
Using the plugin you can perform two-way communication between your application and Kuzzle.


### Examples


```bash
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

By default, the MQTT plugin protocol listens on port 1883.

<aside class="notice">
    The examples given in this documentation use the cli client from the mqtt node.js
    library that is shipped in the Kuzzle Docker image.<br />
    To test them out yourself you will need to enter into the container shell once your docker compose stack is up and running:<br />
    <code>docker exec -ti kuzzle_kuzzle_1 bash</code>
</aside>
