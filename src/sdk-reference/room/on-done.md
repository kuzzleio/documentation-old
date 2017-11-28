---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: onDone
---

# onDone

```js
// Using callbacks (NodeJS or Web Browser)
room.onDone(function (error, room) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
room.onDonePromise()
  .then(room => {
    // resolved once the action has completed
  });
```

```java
room.onDone(new ResponseListener<Room>() {
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

Calls the provided callback when the subscription finishes.

---

## onDone(callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``callback`` | function | Function called with the subscription result |

---

## Return value

Returns this `Room` object to allow chaining.

---

## Callback response

Resolves to this `Room` object
