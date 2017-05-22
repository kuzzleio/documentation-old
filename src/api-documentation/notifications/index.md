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
The subscription action (realtime/subscribe) returns a channel identifier which you can then listen to receive the
notifications.

You can receive the following types of notifications:

**Document Notifications:**

* A document has been created
* A document has been updated and entered your subscription scope
* A document has been updated and left your subscription scope
* A document has been deleted
* A document is about to be created (realtime)
* A document is about to be deleted (realtime)

**Subscription Notifications:**

* A user subscribed to this room
* A user left this room

**Server Notifications:**

* Your JWT Token has expired

---

## exemples

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
