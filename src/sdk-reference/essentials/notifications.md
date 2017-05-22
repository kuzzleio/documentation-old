---
layout: full.html
algolia: true
title: Notifications
---

# Notifications

With Kuzzle, you don't exactly [subscribe]({{ site_base_path }}sdk-reference/collection/subscribe) to a room or a topic but, instead, you subscribe to documents.  
What it means is that, to subscribe, you provide to Kuzzle a set of matching filters, using Kuzzle's [real-time DSL]({{ site_base_path }}kuzzle-dsl). Every time something matches your filters, Kuzzle will send a push notification about it.

You may also provide an empty set of filters, which will tell Kuzzle that you want to listen to any change occuring on a data collection, emulating the behavior of a traditional topic.

To subscribe, you must provide a callback that will be called each time a new notification is received.

Once you have subscribed, depending on the subscription configuration you provided, you may receive the following push notifications:

* a pub/sub message matches your criteria (real-time)
* a matching document is about to be created or deleted (real-time)
* a matching document is created, updated or deleted (once the change is effective in the database)
* a user enters or leaves the room

You may subscribe multiple times to the same room, with identical or different subscription parameters, and with different callbacks. This allows dispatching notifications across the right parts of your application, instead of having to maintain an all-purpose notification consumer (but you can do that, too).

---

## Document notification

| Notification field | Type |Description       | Possible values |
|--------------------|------|------------------|-----------------|
| `result._source` | JSON object | Content of the document or real-time message that generated the notification | |
| `scope` | string | Indicates if the document enters or exits the subscription scope | `in`, `out` |
| `state` | string | Tells if the document is about to be changed, or if the change is effective | `pending`, `done` |

#### Example

```json
{
  "status": 200,
  "error": null,
  "requestId": "bc41ced6-38fc-42b9-8fd5-22ae0774aac2",
  "controller": "name of the controller that generated the notification",
  "action": "name of the action that generated the notification",
  "collection": "collection name",
  "index": "index name",
  "volatile": {},
  "state": "done",
  "scope": "in",
  "result": {
    "_source": {
      "message content": "this is an example"
    }
  }
}
```

---

## User notification

| Notification field | Type |Description       | Possible values |
|--------------------|------|------------------|-----------------|
| `action` | string | Indicates if the user enters or leaves the subscribed room | `on`, `off` |
| `volatile` | JSON object | If provided during subscription, contains application specific informations | |
| `result.count` | integer | Updated number of users subscribing to this room | |

#### Example

```json
{
  "error": null,
  "status": 200,
  "roomId": "ID of the room concerned by this notification",
  "requestId": "5897cd2f-a8a2-40b2-aa43-b31898172008",
  "controller": "subscribe",
  "action": "on",
  "protocol": "protocol used by the notifying user",
  "timestamp": 1453193069592,
  "volatile": {
    "optional": "user informations"
  },
  "result": {
    "roomId": "ID of the room concerned by this notification",
    "count": 42
  }
}
```
