---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: subscribe
---

# subscribe

```js
// Using callbacks (NodeJS or Web Browser)
room.subscribe(function (error, room) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
room.subscribePromise()
  .then(room => {
    // resolved once the action has completed
  });
```

```java
room.subscribe(new ResponseListener<Room>() {
  @Override
  public void onSuccess(Room room) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Subscribes using the filters provided at the object creation.

This method does nothing if the room is already subscribing, or if the subscription is already active, unless [unsubscribe]({{ site_base_path }}sdk-reference/room/unsubscribe/) is called first.

Calling `subscribe` is also unnecessary on a network reconnection event, if the `autoResubscribe` option is set to `true`.

---

## subscribe([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional result callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns this `Room` object to allow chaining.

---

## Callback response

Resolves to this `Room` object

