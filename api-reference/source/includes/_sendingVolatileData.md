---
title: Sending volatile data
---

# Sending volatile data

In every request you send to Kuzzle, you can include a `volatile` object.
This object content will be ignored by Kuzzle,
but it will also be forwarded back in `responses` and in `notifications` (see below).

You can also include volatile information to a subscription request.
These volatile information will be forwarded to other subscribers at the moment of the subscription,
and when you leave the room. Please note that when leaving the room,
the forwarded volatile data are those provided in the **subscription** request.

## Updating a document

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "update",
  "_id": "<documentId>",
  "body": {
    "somefield": "now has a new value"
  },
  "volatile": {
    "modifiedBy": "awesome me",
    "reason": "it needed to be modified"
  }
}
```

<section class="others"></section>

>The following `update` notification will be sent to all subscribers:

<section class="others"></section>

```litcoffee
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "update",
  "state": "pending",
  "scope": "<in|out>",
  "volatile": {
    "modifiedBy": "awesome me",
    "reason": "it needed to be modified"
  },
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "a document ID",
    "_source": {
      "somefield": "now has a new value",
      "someOtherField": "was left unchanged"
    },
  }
}
```


## Subscribe to a room

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
  "volatile": {
    "hello": "my name is Bob"
  }
}
```

<section class="others"></section>

>And then, if you leave the room, the other subscribers will receive the following notification:

<section class="others"></section>

```litcoffee
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "unsubscribe",
  "state": "done",
  "scope": "out",
  "volatile": {
    "hello": "my name is Bob"
  },
  "requestId": "<unique request identifier>",
  "result": {
    "roomId": "<unique Kuzzle room identifier>",
    "count": <the new user count on that room>
  }
}
```

