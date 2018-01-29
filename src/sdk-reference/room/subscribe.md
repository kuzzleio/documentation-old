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

Subscribes using the filters provided as input when the object is created.

This method does nothing if the room is already subscribed to, or if the subscription is already active, unless [unsubscribe]({{ site_base_path }}sdk-reference/room/unsubscribe/) is called first.

Calling `subscribe` is also unnecessary on a network reconnection event if the [`autoResubscribe`]({{ site_base_path }}sdk-reference/room/#properties) property is set to `true`.

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
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

## Return Value

Returns this `Room` object to allow chaining.

---

## Callback Response

Return this `Room` object

