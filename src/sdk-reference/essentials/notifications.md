---
layout: side-code.html
language-tab:
  js: Javascript
algolia: true
title: Notifications
---

# Notifications

With Kuzzle, you don't exactly [subscribe]({{ site_base_path }}sdk-reference/collection/subscribe) to a room or a topic but, instead, you subscribe to documents.  
What it means is that, to subscribe, you provide to Kuzzle a set of matching filters, using Kuzzle's [real-time DSL]({{ site_base_path }}kuzzle-dsl). Every time something matches your filters, Kuzzle will send a push notification about it.

You may also provide an empty set of filters, which will tell Kuzzle that you want to listen to any change occurring on a data collection, emulating the behavior of a traditional topic.

To subscribe, you must provide a callback that will be called each time a new notification is received.

Once you have subscribed, depending on the subscription configuration you provided, you may receive the following push notifications:

* a pub/sub message matches your criteria (real-time)
* a matching document is about to be created or deleted in real-time (deactivated by default)
* a matching document is created, updated or deleted (once the change is effective in the database)
* a user enters or leaves the room (deactivated by default)

You may subscribe multiple times to the same room, with identical or different subscription parameters, and with different callbacks. This allows dispatching notifications across the right parts of your application, instead of having to maintain an all-purpose notification consumer (but you can do that, too).

---

```js
var
  collection = kuzzle.collection('foo', 'bar'),
  filters = {equals: {foo: 'bar'}},
  room;

/*
* simple subscribe to document changes with default scope/state options
*/
room = collection.subscribe(filters, function(data) {
  if (data.scope === 'in') {
    console.log('New document within the scope: ', data.document);
  } else if (data.scope === 'out') {
    console.log('Document moved from the scope: ', data.document);
  }
}).onDone(function(err, res) {
  if (err) {
    console.error('Error while subscribing to the room: ', err);
  } else {
    console.log('Subscription ready');
  }
});

/*
* subscribe only to documents leaving the scope
*/
room = collection.subscribe(filters, {scope: 'out'}, function(data) {
  console.log('Document moved from the scope: ', data.document);
}).onDone(function(err, res) {
  if (err) {
    console.error('Error while subscribing to the room: ', err);
  } else {
    console.log('Subscription ready');
  }
});

/*
* Create a Room with custom options and add some listeners to it
*/

// create the room:
room = collection.room(
  filters,
  {state: 'all', scope: 'in', users: 'all', subscribeToSelf: false}
);

// listen to notifications about pending new documents:
room.on('document', function(data) {
  if (data.state === 'pending') {
    console.log('A new document is about to enter the scope: ', data.document);
  }
});

// listen to notifications about new documents:
room.on('document', function(data) {
  if (data.state === 'done') {
    console.log('New document within the scope: ', data.document);
  }
});

// listen to notifications about other users subscribing to the same room:
room.on('user', function(data) {
  if (data.user === 'in') {
    console.log('A user has joigned the room', data.volatile);
    console.log('Number of listening users: ', data.result.count);
  }
});

// listen to notifications about other users leaving the same room:
room.on('user', function(data) {
  if (data.user == 'out') {
    console.log('A user has leaved the room', data.volatile);
    console.log('Number of listening users: ', data.result.count);
  }
});
```

## Document notification


| Notification field | Type |Description       | Possible values |
|--------------------|------|------------------|-----------------|
| `document` | [Document]({{ site_base_path}}sdk-reference/document/) | Content of the document or real-time message that generated the notification | |
| `scope` | string | Indicates if the document enters or exits the subscription scope | `in`, `out` |
| `state` | string | Tells if the document is about to be changed, or if the change is effective | `pending`, `done` |
| `type` | string | Notification type | `document` |

#### Example

<div class="noside">
```json
{
  "status": 200,
  "requestId": "bc41ced6-38fc-42b9-8fd5-22ae0774aac2",
  "controller": "name of the controller that generated the notification",
  "action": "name of the action that generated the notification",
  "collection": "collection name",
  "index": "index name",
  "volatile": {},
  "state": "done",
  "scope": "in",
  "type": "document",
  "document": {
    "content": {
      "content": "document content example"
    },
    "id": "<document identifier (when applicable)>"
  }
}
```
</div>

---

## User notification

| Notification field | Type |Description       | Possible values |
|--------------------|------|------------------|-----------------|
| `user` | string | Indicates if the user enters or leaves the subscribed room | `in`, `out` |
| `volatile` | JSON object | If provided during subscription, contains application specific information | |
| `result.count` | integer | Updated number of users subscribing to this room | |
| `type` | string | Notification type | `user` |

#### Example

<div class="noside">
```json
{
  "status": 200,
  "roomId": "ID of the room concerned by this notification",
  "requestId": "5897cd2f-a8a2-40b2-aa43-b31898172008",
  "controller": "subscribe",
  "user": "in",
  "protocol": "protocol used by the notifying user",
  "timestamp": 1453193069592,
  "volatile": {
    "optional": "user information"
  },
  "type": "user",
  "result": {
    "count": 42
  }
}
```
</div>
