---
layout: side-code.html
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
var room = kuzzle.collection('collection', 'index').room();

room = kuzzle
  .collection('collection', 'index')
  .room({subscribeToSelf: false});
```

```java
Room room = new Room(dataCollection);

RoomOptions options = new RoomOptions().setSubscribeToSelf(false);
Room room = new Room(dataCollection, options);
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

The `Room` object is the result of a subscription request, allowing to manipulate the subscription itself.

---

## Room(Collection, [options])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Collection`` | object | an instantiated Kuzzle Collection object |
| ``options`` | object | Optional subscription configuration |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON Object | Additional information passed to notifications to other users | ``null`` |
| ``scope`` | string | Filter [document notifications]({{ site_base_path }}sdk-reference/essentials/notifications/#document-notification) depending on their scope status. You may receive entering documents (scope: ``in``), leaving documents (scope: ``out``), all documents changes (scope: ``all``) or filter these notifications completely (scope: ``none``). This filter does not affect pub/sub messages or user events. | ``all`` |
| ``state`` | string | Filter [document notifications]({{ site_base_path }}sdk-reference/essentials/notifications/#document-notification) depending on the state of the modifying request. You may receive real-time notifications when a document is about to be changed (state: ``pending``), or be notified when the change has been fully written in the database (state: ``done``), or both (state: ``all``). This filter does not affect pub/sub messages or user events. | ``done`` |
| ``subscribeToSelf`` | boolean | (Don't) subscribe to notifications fired as a consequence of our own queries | ``true`` |
| ``users`` | string | Filter [user notifications]({{ site_base_path }}sdk-reference/essentials/notifications/#user-notification) triggered upon a user entering the room (user: ``in``), leaving the room (user: ``out``), or both (user: ``all``). Setting this variable to ``none`` prevents receiving these notifications | ``none`` |

---

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``collection`` | string | The subscribed data collection | get |
| ``filters`` | JSON object | The current set of filters of this room | get/set |
| ``headers`` | JSON Object | Common headers for all sent documents. | get/set |
| ``volatile`` | JSON Object | Additional information passed to notifications to other users | get/set |
| ``subscribeToSelf`` | boolean | (Don't) subscribe to notifications fired as a consequence of our own queries | get/set |
| ``roomId`` | string | Unique room identifier | get |

**Notes:**

* the ``headers`` property is inherited from the provided ``Collection`` object and can be overridden
* updating the ``volatile`` property takes effect after ``renew`` is called
* by default, the global Kuzzle ``volatile`` properties are sent along with the subscription request. If a ``volatile`` option is provided during subscription, it will be merged with the global ``volatile`` for the subscription only. In case of conflicts, subscription ``metadata`` take priority over the global ``metadata``.
