---
layout: side-code.html.hbs
algolia: true
language-tab:
  json: HTTP
  js: Other protocols
  html: Snippets
title: subscribe
---


# subscribe

{{{since "1.0.0"}}}


<blockquote class="json">
<p>
**Due to the synchronous nature of the HTTP protocol, real-time messaging is not supported.**
</p>
</blockquote>

<blockquote class="js">
<p>
<b>Query</b>
</p>
</blockquote>


```js
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "subscribe",
  "body": {
    // subscription filters
  },
  "volatile": {
    // query volatile data
  },

  /*
   * The "scope" argument filters document modifications when a change has been
   * detected in the database.
   * You may receive notifications only when documents enter your
   * scope (scope: "in"), when documents leave it (scope: "out"), or
   * both (scope: "all")
   *
   * You may also filter out all these notifications (scope = "none")
   *
   * Default: scope: "all"
   */
  "scope": "<all|in|out|none>",

  /*
   * The "state" argument filters document notifications depending on their state.
   * This does not affect pub/sub messages or user events.
   *
   * You may choose to only receive document notifications when a change has
   * been detected in the database (state = "done"), when a document is
   * about to be changed (state: "pending"), or both (state: "all")
   *
   * Default: "done"
   */
  "state": "<all|pending|done>",

  /*
   * User events are notification sent when users enter or leave the room you
   * subscribed to.
   *
   * You may choose to receive notifications when users enter the
   * room (users: "in"), when they leave the room (users: "out"), or
   * both (users: "all")
   *
   * Default: "none"
   */
  "users": "<all|in|out|none>"
}
```


<blockquote class="js">
<p>
**Response**
</p>
</blockquote>



```js
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "subscribe",
  "volatile": {},                 
  "requestId": "<unique request identifier>",
  "result": {
    "roomId": "<unique Kuzzle room identifier>",
    "channel": "<unique channel identifier>"
  }
}
```



<blockquote class="html">
<p>
**Websocket**
</p>
</blockquote>


```html
<script>
  var
    socket = new WebSocket("ws://localhost:7512"),
    channel;

  socket.onmessage = function (payload) {
    var response = JSON.parse(payload.data);

    if (response.room === "mySubscription") {
      channel = response.result.channel;
    }

    if (response.room === channel) {
      console.log(response);

      /*
      {
        "status": 200,
        "type": "document",
        "index": "index",
        "collection":"collection",
        "controller": "realtime",
        "action": "publish",
        "state": "done",
        "scope": "in",
        "requestId": "<unique request identifier>",
        "result":{
          "some real-time": "message"
        }
      }
      */
    }
  };

  socket.onopen = function () {
    socket.send(JSON.stringify({
      "requestId": "mySubscription",
      "index": "index",
      "collection": "collection",
      "controller": "realtime",
      "action": "subscribe",
      "body": {}
    }));
  };
</script>
```



<blockquote class="html">
<p>
**Socket.io**
</p>
</blockquote>



```html
/*
  Using socket.io
 */
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script>
    var socket = io("http://localhost:7512");

    socket.once("mySubscription", function (response) {
      console.log(response);

      /*
      {
        "status": 200,
        "type": "document",
        "index": "<index>",
        "collection": "<collection>"
        "controller": "realtime",
        "action": "subscribe",
        "state": "done",
        "volatile": {},
        "result": {
          "some real-time": "message"
        }
      }
      */
    });

    socket.emit("kuzzle", {
      "requestId": "mySubscription",
      "index": "index",
      "collection": "collection",
      "controller": "realtime",
      "action": "subscribe",
      "body": {}
    });
</script>
```

Subscription works differently in Kuzzle than it does with a regular publish/subscribe protocol.
In Kuzzle, you don't exactly subscribe to a room or to a topic but, instead, you subscribe to documents.

What it means is that, when you make a subscription request, you can send Kuzzle a set of document or message filters that define when a notification is triggered.
Of course, you can also subscribe to a ``data collection`` with no other matching criteria,
and then you'll effectively be listening to a "topic".

<aside class="notice">
  If an empty body is provided, the subscription is performed on the whole collection.
</aside>

Once you have subscribed to a room, depending on your filters, you may receive a notification:

* when a pub/sub message is published matching your criteria (real-time)
* when a matching document is about to be created or deleted (real-time)
* when a document is created, updated or deleted and matches a filter
* when a user enters or exits a room

The good news is that you can tell Kuzzle to only send notifications that are relevant to your application
by configuring your subscription request (see below).
You can also create multiple subscriptions to the same room, each with different configurations.
Kuzzle will provide you with a channel for each of these subscriptions,
allowing your application to handle these processes separately.

The criteria is defined in Kuzzle using [Koncorde]({{ site_base_path }}kuzzle-dsl)

How subscription works:

* => You send a subscription request to Kuzzle
* <= Kuzzle responds with a ``roomId`` and a `channel`

When using `websocket` or `socket.io` protocol, the client will start receiving [notifications]({{ site_base_path }}api-documentation/notifications) right away.  
When using other protocols, such as `MQTT`, the client may have to perform these two extra steps:

* => First listen to the ``channel`` provided in the response
* <= Kuzzle forwards the corresponding [notifications]({{ site_base_path }}api-documentation/notifications/) on that channel
