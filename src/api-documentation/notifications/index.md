---
layout: full.html
algolia: true
title: Notifications
description: understand Kuzzle real-time notifications mechanisms
show-subheader: true
order: 500
---

# Notifications

[Subscribing to some documents in Kuzzle]({{ site_base_path }}api-documentation/controller-realtime/subscribe) allows to be notified back each time a document matches your criteria.

---

## Document notifications

These notifications are pushed to matching subscribers when:

* A real-time message is sent
* A document is about to be created (the creation is not guaranteed)
* A document has been successfully created
* A document has been updated and entered your subscription scope
* A document has been updated and left your subscription scope
* A document is about to be deleted (the deletion is not guaranteed)
* A document has been deleted

A document notification contain the following fields:

| Notification field | Type |Description       | Possible values |
|--------------------|------|------------------|-----------------|
| `collection` | string | The modified data collection | |
| `index` | string | The modified data index | |
| `protocol` | string | The network protocol used to modify the document | |
| `result._id` | string | The document identifier. Can be null if the document doesn't exist yet, or if the notification is about a real-time message | |
| `result._source` | object | The message or full document content. Undefined if the notification is about a document deletion |
| `scope` | string | Indicates if the document enters or exits the subscription scope | `in`, `out` |
| `state` | string | Tells if the document is about to be changed, or if the change is effective | `pending`, `done` |
| `volatile` | object | Request [volatile data]({{ site_base_path }}api-documentation/volatile-data/) | |


Document notification example:

```json
{
  "error":null,
  "status":200,
  "index":"foo",
  "collection":"bar",
  "controller":"realtime",
  "action":"publish",
  "protocol":"http",
  "timestamp":1497513122738,
  "volatile":null,
  "scope":"in",
  "state":"done",
  "result":{
    "_source":{
      "some": "document content"
    },
    "_id": "<some document identifier>"
  },
  "room":"893e183fc7acceb5-7a90af8c8bdaac1b"
}
```

---

## Subscription notifications

These notifications are pushed to matching subscribers when:

* A user subscribed to [the same room]({{ site_base_path}}kuzzle-dsl/roomid/)
* A user left this room

By default, Kuzzle does not send these notifications. You have to provide an appropriate `users` attribute to your [subscription request]({{ site_base_path }}api-documentation/controller-realtime/subscribe/) to be notified about users activity.


| Notification field | Type |Description       | Possible values |
|--------------------|------|------------------|-----------------|
| `collection` | string | The data collection attached to the room | |
| `index` | string | The data index attached to the room | |
| `protocol` | string | The network protocol used to modify the document | |
| `result.count` | integer | The current number of users in this room | |
| `roomId` | string | The corresponding [room identifier]({{ site_base_path}}kuzzle-dsl/roomid/) | |
| `user` | string | Tells if this notification is about an entering user (`in`) or a leaving one (`out`) | `in`, `out`|
| `volatile` | object | Request [volatile data]({{ site_base_path }}api-documentation/volatile-data/) | |


Subscription notification example:

```json
{
  "error":null,
  "status":200,
  "roomId":"893e183fc7acceb5",
  "requestId":"015132a1-b01d-424b-b003-36fcbf13c8a9",
  "index":"<index name>",
  "collection":"<collection name>",
  "controller":"realtime",
  "action":"subscribe",
  "protocol":"websocket",
  "timestamp":1497517009931,
  "volatile": null,
  "user":"in",
  "result":{
    "count": 42
  },
}
```

---

## Server notifications

These notifications are sent to all of a client's subscriptions when their [authentication token]({{ site_base_path }}guide/essentials/user-authentication/#user-authentication-user-authentication) has expired.

| Notification field | Type | Value |
|--------------------|------|------------------|
| `controller` | string | `auth` |
| `action` | string | `jwtTokenExpired`|


Server notification example:

```json
{
  "error":null,
  "status":200,
  "roomId":"893e183fc7acceb5",
  "index":null,
  "collection":null,
  "controller":"auth",
  "action":"jwtTokenExpired",
  "protocol":null,
  "timestamp":1497517385301,
  "volatile":null,
}
```

---

## Code examples

### Websocket


```html
// For browsers not supporting websocket, use socket.io instead
<script>
  var
    socket = new WebSocket("ws://localhost:7512"),
    channel;

  socket.onmessage = function (payload) {
    var response = JSON.parse(payload.data);

    /*
     step 1 - we get the created channel name, as notifications will be sent
        with "room = channelName"
     */
    if (response.room === "mySubscription") {
      // we now have a channel to listen to
      channel = response.result.channel;
    }

    if (response.room === channel) {
      console.log("Received a notification: ", response);

      /*
      {
        "status": 200,
        "error": null,
        "index": "index",
        "collection":"collection",
        "controller": "realtime",
        "action": "publish",
        "state": "done",
        "scope": "in",
        "requestId": "<unique request identifier>",
        "result": {
          ...    // the published document
        }
      }
      */
    }
  };

  // step 2 - we subscribe to our documents
  socket.onopen = function () {
    socket.send(JSON.stringify({
      "requestId": "mySubscription",
      "index": "index",
      "collection": "collection",
      "controller": "realtime",
      "action": "subscribe",
      "body": {}
    }));

    // step 3 - when publishing a message, we get some notifications back
    socket.send(JSON.stringify({
      "index": "index",
      "collection": "collection",
      "controller": "realtime",
      "action": "publish",
      "body": {
        "foo": "bar"
      }
    }));
  };
</script>
```

### Socket.io

```html
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script>
  var socket = io("http://localhost:7512");

  // step 1 - we prepare ourself to receive Kuzzle's subscription response and then listen to the created channel.
  socket.once("mySubscription", function (response) {
    // we now have a channel to listen to
    socket.on(response.result.channel, function (notification) {
      console.log(notification);

      /*
      {
        "status": 200,
        "error": null,
        "index": "index",
        "collection":"collection",
        "controller": "realtime",
        "action": "publish",
        "state": "done",
        "scope": "in",
        "requestId": "<unique request identifier>",
        "result": {
          ...    // the published document
        }
      }
      */
    });
  });

  // step 2 - we subscribe to our documents
  socket.emit("kuzzle", {
    "requestId": "mySubscription",
    "index": "index",
    "collection": "collection",
    "controller": "realtime",
    "action": "subscribe",
    "body": {}
  });

  // step 3 - when publishing a message, we get some notifications back
  socket.emit("kuzzle", {
    "index": "index",
    "collection": "collection",
    "controller": "realtime",
    "action": "publish",
    "body": {
      "foo": "bar"
    }
  });
</script>
```

### MQTT

```bash
#!/bin/bash

# shell 1 - getting direct responses from kuzzle
node_modules/.bin/mqtt subscribe -v -h rabbit -t mqtt.myId

# shell 2 - we subscribe to our documents
node_modules/.bin/mqtt publish -h rabbit -t kuzzle -m '{
  "controller": "realtime",
  "action":"subscribe",
  "index": "index",
  "collection": "collection",
  "body": {}
}'

# shell 1 (prettified)
mqtt/myId {
  "status": 200,
  "error": null,
  "index": "index",
  "collection": "collection",
  "controller": "controller",
  "action": "action",
  "volatile": {},
  "requestId": "60621753-2da2-441a-b30b-546127f26cd1",
  "result": {
    "roomId": "632682a9eac95cfb95e3a697b29b7739",
    "channel": "632682a9eac95cfb95e3a697b29b7739-1c7beed7521fd0b0a8177f219b786d2e",
    "timestamp": 1450267140597
  }
}

# shell 3 - we subscribe to the nofitications
node_modules/.bin/mqtt subscribe -h rabbit -t 632682a9eac95cfb95e3a697b29b7739-1c7beed7521fd0b0a8177f219b786d2e

# shell 2 - we publish a message
node_modules/.bin/mqtt publish -h rabbit -t kuzzle -m '{
  "controller": "realtime",
  "action": "publish",
  "index": "index",
  "collection": "collection",
  "body": {"foo": "bar"}
}'

# shell 3
{
  "status": 200,
  "error": null,
  "index": "index",
  "collection": "collection",
  "controller": "controller",
  "action": "action",
  "state": "done",
  "scope": "in",
  "volatile": {},
  "requestId": "10bca195-f375-4b72-817a-04fcb22b3681",
  "result": {
    "_source": {"foo":"bar"}
  }
}
```
