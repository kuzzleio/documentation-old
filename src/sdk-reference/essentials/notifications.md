---
layout: full.html
algolia: true
title: Notifications
order: 300
---

# Notifications

With Kuzzle Backend, you don't [subscribe]({{ site_base_path }}sdk-reference/collection/subscribe) to a room or a topic but, instead, you subscribe to documents.  
This means, that when you want to subscribe you must provide a set of filter definitions, using [Koncorde]({{ site_base_path }}kuzzle-dsl), that tell Kuzzle Backend what documents should trigger a notification. Then, any time a document matches the defined filters, Kuzzle Backend will send a push notification to the subscriber.

You can also provide an empty set of filters, which will tell Kuzzle Backend that you want to listen to any change occurring on a data collection, emulating the behavior of a traditional topic.

To subscribe, you must provide a callback that will be called each time a new notification is received.

Once you have subscribed, depending on the subscription configuration you provided, you may receive a push notification when:

* a pub/sub message matches your criteria (real-time)
* a matching document is about to be created or deleted in real-time (deactivated by default)
* a matching document is created, updated or deleted (once the change is effective in the database)
* a user enters or leaves the room (deactivated by default)

You may subscribe multiple times to the same room, with identical or different subscription parameters, and with different callbacks. This allows you to dispatch notifications to dedicated processes of your application, instead of maintaining a single all-purpose notification consumer (but you can do that too I you want).

---

```js
var2
  collection = kuzzle.collection('foo', 'bar'),
  filters = {equals: {foo: 'bar'}},
  room;

/*
* Use case 1 : Simple subscription to document changes with default scope/state options
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
```

```js
var
  collection = kuzzle.collection('foo', 'bar'),
  filters = {equals: {foo: 'bar'}},
  room;

/*
* Use case 2 : Subscribe only to documents leaving the scope
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
```

```js
var
  collection = kuzzle.collection('foo', 'bar'),
  filters = {equals: {foo: 'bar'}},
  room;

/*
* Use case 3 : Create a Room with custom options and add some listeners to it
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

// subscribe to the room:
room.subscribe(function(err, res) {
  if (err) {
    console.error('Error while subscribing to the room: ', err);
  } else {
    console.log('Subscription ready');
  }
});
```

## Document Notification

| Notification field | Type |Description       | Possible values |
|--------------------|------|------------------|-----------------|
| `document` | [Document]({{ site_base_path}}sdk-reference/document/) | Content of the document or real-time message that generated the notification | |
| `scope` | string | Indicates if the document enters or exits the subscription scope | `in`, `out` |
| `state` | string | Shows if the document is about to be changed, or if the change is done | `pending`, `done` |
| `type` | string | Notification type | `document` |

#### Example

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

---

## User notification

| Notification field | Type |Description       | Possible values |
|--------------------|------|------------------|-----------------|
| `user` | string | Indicates if the user enters or leaves the subscribed room | `in`, `out` |
| `volatile` | JSON object | If provided during subscription, contains application specific information | |
| `result.count` | integer | Updated number of users subscribing to this room | |
| `type` | string | Notification type | `user` |

#### Example

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
