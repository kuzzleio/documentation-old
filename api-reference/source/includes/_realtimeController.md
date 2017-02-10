# ~ realtime controller


## count

<section class="http"></section>

>Due to the synchronous nature of the HTTP protocol, real-time messaging is not supported.

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "count",
  "body": {
    "roomId": "unique room ID"
  },
  "metadata": {
    // query metadata
  }
}
```

<section class="others"></section>

>Response

<section class="others"></section>

```litcoffee
{
  "status": 200,                        // Assuming everything went well
  "error": null,                        // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "count",
  "requestId": "<unique request identifier>",
  "result": {
    "roomId": "<unique Kuzzle room identifier>",
    "count": <number of subscriptions>,
  }
}
```

Returns the number of people/applications who have subscribed to the same documents as you have.

The expected parameter is the roomId returned by Kuzzle during the subscription.


## join

<section class="http"></section>

>Due to the synchronous nature of the HTTP protocol, real-time messaging is not supported.

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "join",
  "body": {
    "roomId": "<the room identifier to join>"
  },
  "metadata": {
    // query metadata
  },
  "scope": "<all|in|out|none>",
  "state": "<all|pending|done>",
  "users": "<all|in|out|none>"
}
```

<section class="others"></section>

>Response

<section class="others"></section>

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "subscribe",
  "metadata": {},                     // subscription metadata
  "requestId": "<unique request identifier>",
  "result": {
    "roomId": "<unique Kuzzle room identifier>"
  }
}
```

Joins a previously created subscription.

The `roomId` parameter is returned by Kuzzle when [subscribing](#subscribe) to some documents.


## list

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_listSubscriptions`
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "realtime",
  "action": "list"
}
```

>Response

```litcoffee
{
  "error": null,
  "status": 200,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "publish",
  "metadata": {},
  "requestId": "<unique request identifier>",
  "result": {
    "<index>": {
      "<collection>": {
        "afcd909773f197ab859447594bfbd154": 12,
        "4adbc1948ac4dc84ac89d14b488bcad1": 4,
        ...
      },
      "<anotherCollection>": {
        "bcd4ab54cdb4ad5b464ba4cd4564dc46": 1,
        ...
      },
      ...
    },
    "<anotherIndex>": {
      ...
    },
    ...
  },
}
```

Lists all subscriptions on all indexes and all collections.


## publish

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/<collection>/_publish`
>**Method:** `POST`
>**Body:**

<section class="http"></section>

```litcoffee
{
  // The message to send
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "publish",
  // The document itself
  "body": {
    ...
  }
}
```

>Response

```litcoffee
{
  "error": null,
  "status": 200,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "publish",
  "metadata": {},
  "requestId": "<unique request identifier>",
  "result": {}
}
```

Sends a real-time message to Kuzzle. The message will be dispatched to all the clients
who have subscribed to a subscription for which the filters match the message content.

<aside class="warning">
  The message is **not** persisted in the database.
</aside>


## subscribe

<section class="http"></section>

>Due to the synchronous nature of the HTTP protocol, real-time messaging is not supported.

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "subscribe",
  "body": {
    // subscription filters
  },
  "metadata": {
    // query metadata
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

<section class="others"></section>

<aside class="right notice">
  If an empty body is provided, the subscription is performed on the whole collection.
</aside>

<section class="others"></section>

>Response

<section class="others"></section>

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "subscribe",
  "metadata": {},                     // subscription metadata
  "requestId": "<unique request identifier>",
  "result": {
    "roomId": "<unique Kuzzle room identifier>",
    "channel": "<unique channel identifier>"
  }
}
```

<section class="others"></section>

>Websocket

<section class="others"></section>

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

<section class="others"></section>

>Socket.io

<section class="others"></section>

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
        "metadata": {},
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

The matching criteria you pass on to Kuzzle are based upon [Kuzzle DSL](./filters.md)

How subscription works:

* => You send a subscription query to Kuzzle
* <= Kuzzle responds to you with a ``roomId`` and a `channel`
* => You listen to the ``channel`` provided in the response
* <= Kuzzle forwards the corresponding [notifications](/#notifications) on that channel


## unsubscribe

<section class="http"></section>

>Due to the synchronous nature of the HTTP protocol, real-time messaging is not supported.

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<data index>",
  "collection": "<data collection>",
  "controller": "realtime",
  "action": "unsubscribe",

  "body": {
    "roomId": "<unique room ID>"
  },
  "metadata": {
    // query metadata
  }
}
```

<section class="others"></section>

>Response

<section class="others"></section>

```litcoffee
{
  "status": 200,                        // Assuming everything went well
  "error": null,                        // Assuming everything went well
  "index": "<data index>",
  "collection": "<data collection>",
  "controller": "realtime",
  "action": "unsubscribe",
  "metadata": {},                       // subscription metadata
  "requestId": "<unique request identifier>",
  "result": {
    "roomId": "<unique Kuzzle room identifier>"
  }
}
```

Instructs Kuzzle to detach you from its subscribers for the given room.
In practice, your subscription won't receive any new message on the room once this action is triggered.

The expected parameter is the `roomId` that Kuzzle returned during the subscription.


## validate

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/<collection>/_validate`
>**Method:** `POST`
>**Body:**

<section class="http"></section>

```litcoffee
{
    // The message to send
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  index: "<index>",
  collection: "<collection>",
  controller: "realtime",
  action: "validate",
  // The document itself
  body: {
    ...
  }
}
```

>Response

```litcoffee
{
  status: 200,                      // Assuming everything went well
  error: null,                      // Assuming everything went well
  index: "<index>",
  collection: "<collection>",
  controller: "realtime",
  action: "validate",
  metadata: {},
  result: {
    errorMessages: {},              // There is no error messages
    valid: true                     // The document complies with validation specifications
  }  
}
```

Validates data against existing validation rules. The data is not published nor stored by Kuzzle
If the document complies, the `result.valid` value is `true`, if not, it is `false`.
When the document does not complies, both `result.errorMessages` contains some very detailed hints on what is wrong with the document.
Note that if no validation specifications are set for the &lt;data index>/&lt;data collection>, the document always validate.
In any ways, the document is **not** stored nor published.
