---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: Room
description: Real-time subscription management class
show-subheader: true
subheader-title: Constructor
---

# Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 Room objects are returned by Collection.subscribe and
 Document.subscribe methods.

 You may also use the Collection.room() method:
 */
var room = kuzzle.collection('collection', 'index').room({in: {field: ['some', 'filter']}});

room = kuzzle
  .collection('collection', 'index')
  .room({in: {field: ['some', 'filter']}}, {subscribeToSelf: false});
```

```java
JSONObject filters = new JSONObject()
  .put("in",
    new JSONObject("field")
      .put(new JSONArray()
        .put("some")
        .put("filter")
      )
  );

Room room = new Room(dataCollection, filters);

RoomOptions options = new RoomOptions().setSubscribeToSelf(false);
Room room = new Room(dataCollection, filters, options);
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

The `Room` object is the result of a subscription request, allowing you to manipulate the subscription itself.
A `Room` object is a [KuzzleEventEmitter]({{ site_base_path }}sdk-reference/event-emitter/) instance, so that we can listen to subription notifications.


---

## Room(Collection, filters, [options])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Collection`` | object | an instantiated Kuzzle Collection object |
| ``filters`` | JSON Object | [Filters]({{ site_base_path }}kuzzle-dsl) |
| ``options`` | object | Optional subscription configuration |

---

## Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| ``autoResubscribe`` | boolean | Automatically renew the room on a ``reconnected`` event | global ``autoResubscribe`` kuzzle option |
| ``scope`` | string | Filter [document notifications]({{ site_base_path }}sdk-reference/essentials/notifications/#document-notification) depending on their scope status. You may receive entering documents (scope: ``in``), leaving documents (scope: ``out``), all documents changes (scope: ``all``) or filter these notifications completely (scope: ``none``). This filter does not affect pub/sub messages or user events. | ``all`` |
| ``state`` | string | Filter [document notifications]({{ site_base_path }}sdk-reference/essentials/notifications/#document-notification) depending on the state of the modifying request. You may receive real-time notifications when a document is about to be changed (state: ``pending``), or be notified when the change has been fully written in the database (state: ``done``), or both (state: ``all``). This filter does not affect pub/sub messages or user events. | ``done`` |
| ``subscribeToSelf`` | boolean | (Don't) subscribe to notifications fired as a consequence of our own queries | ``true`` |
| ``users`` | string | Filter [user notifications]({{ site_base_path }}sdk-reference/essentials/notifications/#user-notification) triggered upon a user entering the room (user: ``in``), leaving the room (user: ``out``), or both (user: ``all``). Setting this variable to ``none`` prevents receiving these notifications | ``none`` |
| ``volatile`` | JSON Object | Additional information passed to notifications to other users | ``null`` |

---

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``autoResubscribe`` | boolean | Automatically renew the room on a ``reconnected`` event | get |
| ``collection`` | string | The subscribed data collection | get |
| ``filters`` | JSON object | The current set of filters of this room | get |
| ``roomId`` | string | Unique room identifier | get |
| ``subscribeToSelf`` | boolean | (Don't) subscribe to notifications fired as a consequence of our own queries | get/set |
| ``volatile`` | JSON Object | Additional information passed to notifications to other users | get/set |

**Notes:**

* the ``headers`` property is inherited from the provided ``Collection`` object and can be overridden
* updating the ``volatile`` property takes effect only after the subscription is renewed
* by default, the global Kuzzle ``volatile`` properties are sent along with the subscription request. If a ``volatile`` option is provided during subscription, it will be merged with the global ``volatile`` for the subscription only. In case of conflicts, subscription ``volatile`` data takes priority over the global ``volatile`` ones.
