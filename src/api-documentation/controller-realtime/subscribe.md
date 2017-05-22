---
layout: side-code.html
algolia: true
language-tab:
  json: HTTP
  js: Other protocols
  html: Snippets
title: subscribe
---


# subscribe


<blockquote class="json">
<p>
**Due to the synchronous nature of the HTTP protocol, real-time messaging is not supported.**
</p>
</blockquote>

<blockquote class="js">
<p>
**Query**
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
        "error": null,
        "index": "index",
        "collection":"collection",
        "controller": "realtime",
        "action": "publish",
        "state": "done",
        "scope": "in",
        "requestId": "<unique request identifier>",
        "result":{
          "roomId":"632682a9eac95cfb95e3a697b29b7739",
          "requestId":"mySubscription",
          "timestamp":1449564937142
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
        "error": null,
        "status": 200,
        "index": "<index>",
        "collection": "<collection>"
        "controller": "realtime",
        "action": "subscribe",
        "state": "done",
        "volatile": {},
        "result": {
          "roomId": "632682a9eac95cfb95e3a697b29b7739",
          "requestId": "mySubscription",
          "timestamp": 1449564937142
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

Subscription works differently in Kuzzle than with a regular publish/subscribe protocol.
In Kuzzle, you don't exactly subscribe to a room or to a topic but, instead, you subscribe to documents.

What it means is that, along with your subscription query, you also give to Kuzzle a set of document or message filters.
Of course, you may also subscribe to a ``data collection`` with no other matching criteria,
and you'll effectively listen to a "topic".

<aside class="notice">
  If an empty body is provided, the subscription is performed on the whole collection.
</aside>

Once you have subscribed to a room, depending on your filters, you may receive the following notifications:

* whenever a pub/sub message is published matching your criteria (realtime)
* whenever a matching document is about to be created or deleted (realtime)
* whenever a matching stored document is created, updated or deleted (once the change is effective in the database)
* whenever a user enters or leaves the room

Good news is, you may ask Kuzzle to send only the notifications relevant to your application,
by configuring your subscription request (see below).
You can also subscribe multiple times to the same room, with different configurations.
Kuzzle will provide you with a channel for each of these subscriptions,
allowing different part of your application to concentrate on what it needs to process.

The matching criteria you pass on to Kuzzle are based upon [Kuzzle DSL]({{ site_base_path }}kuzzle-dsl)

How subscription works:

* => You send a subscription query to Kuzzle
* <= Kuzzle responds to you with a ``roomId`` and a `channel`

When using `websocket` or `socket.io` protocol, the client will start receiving [notifications]({{ site_base_path }}api-documentation/notifications) right away.  
When using other protocols, such as `MQTT`, the client may have to perform these two extra steps:

* => You listen to the ``channel`` provided in the response
* <= Kuzzle forwards the corresponding [notifications]({{ site_base_path }}api-documentation/notifications/) on that channel
