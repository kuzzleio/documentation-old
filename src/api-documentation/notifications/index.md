---
layout: full.html.hbs
algolia: true
title: Notification Types
description: understanding Kuzzle real-time notifications
show-subheader: true
order: 500
---

# Notification Types

A client can [subscribe to document changes in Kuzzle]({{ site_base_path }}api-documentation/controller-realtime/subscribe) in order to receive a notification each time a document matches a certain criteria.

---

## Document Notifications

Document notifications can be sent to subscribers:

* When a real-time message is sent
* On Document Creation: a document has been successfully created
* On Document Creation Pending: a document is about to be created (the creation is not guaranteed)
* On Document Deletion: A document has been deleted
* On Document Deletion Pending: A document is about to be deleted (the deletion is not guaranteed)
* On Document Entering Subscription Scope: a document has been updated and enters the subscription scope
* On Document Exiting Subscription Scope: a document has been updated and exits the subscription scope

A document notification contains the following fields:

| Notification field | Type |Description       | Possible values |
|--------------------|------|------------------|-----------------|
| `action` | string | The API controller's action used to modify the data collection | |
| `collection` | string | The modified data collection | |
| `controller` | string | The API controller used to modify the data collection | |
| `index` | string | The modified data index | |
| `protocol` | string | The network protocol used to modify the document | |
| `result._id` | string | The document identifier. Can be null if the document doesn't exist yet, or if the notification is about a real-time message | |
| `result._meta` | object | DEPRECATED in 1.3.0 - Document meta-data (creation time, last update time, and so on). Can be null. | |
| `result._source` | object | The message or full document content. Undefined if the notification is about a document deletion |
| `result._source._kuzzle_info` | object | Document meta-data (creation time, last update time, and so on). Can be null. |
| `scope` | string | Indicates if the document enters or exits the subscription scope | `in`, `out` |
| `state` | string | Shows if the document is about to be changed, or if the change is done | `pending`, `done` |
|`timestamp` | number | Timestamp of the request from which is issued this notification (in epoch-milliseconds) | |
| `type` | string | The notification type | `document` |
| `volatile` | object | Request [volatile data]({{ site_base_path }}api-documentation/volatile-data/) | |


Document notification example:

```json
{
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
    "_id": "<some document identifier>",
    "_meta": {
      "author": "<author id>",
      "createdAt": 1497866996975,
      "updatedAt": null,
      "updater": null,
      "active": true,
      "deletedAt": null
    }
  },
  "room":"893e183fc7acceb5-7a90af8c8bdaac1b"
}
```

---

## Subscription Notifications

Subscription notifications are pushed to subscribers when:

* A user subscribes to [the same room]({{ site_base_path}}kuzzle-dsl/roomid/)
* A user leaves a room

By default, Kuzzle does not send these notifications. You have to provide an appropriate `users` attribute to your [subscription request]({{ site_base_path }}api-documentation/controller-realtime/subscribe/) to be notified about user activity.


| Notification field | Type |Description       | Possible values |
|--------------------|------|------------------|-----------------|
| `collection` | string | The data collection attached to the room | |
| `index` | string | The data index attached to the room | |
| `protocol` | string | The network protocol used to modify the document | |
| `result.count` | integer | The current number of users in this room | |
| `timestamp` | number | Timestamp of the request from which is issued this notification (in epoch-milliseconds) | |
| `type` | string | The notification type | `user` |
| `user` | string | Tells if this notification is about an entering user (`in`) or a leaving one (`out`) | `in`, `out`|
| `volatile` | object | Request [volatile data]({{ site_base_path }}api-documentation/volatile-data/) | |


Subscription notification example:

```json
{
  "error":null,
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

## Server Notifications

Server notifications are sent to all of a client's subscriptions when their [authentication token]({{ site_base_path }}guide/essentials/user-authentication) has expired.

| Notification field | Type | Value |
|--------------------|------|------------------|
| `message` | string | Server message explaining why this notification has been triggered | |
| `type` | string | Notification type | `TokenExpired` |


Server notification example:

```json
{
  "status":200,
  "info": "This is an automated server notification",
  "message": "Authentication Token Expired",
  "type": "TokenExpired"
}
```

---

## Code Examples

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
        "index": "index",
        "collection":"collection",
        "controller": "realtime",
        "action": "publish",
        "state": "done",
        "scope": "in",
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
      "requestIdThese": "mySubscription",
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
        "index": "index",
        "collection":"collection",
        "controller": "realtime",
        "action": "publish",
        "state": "done",
        "scope": "in",
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
      "foo":These "bar"
    }
  });
</script>
```
