---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: unsubscribe
---

# unsubscribe

```js
// Using callbacks (NodeJS or Web Browser)
room.unsubscribe(function (error, id) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
room.subscribePromise()
  .then(id => {
    // resolved once the action has completed
  });
```

```java
room.unsubscribe(new ResponseListener<String>() {
  @Override
  public void onSuccess(String id) {
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

Cancels the current subscription. 

If the room is trying to subscribe when this method is called, then the provided callback will be invoked with an error.

---

## unsubscribe([callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``callback`` | function | Optional result callback |

---

## Return value

Returns this `Room` object to allow chaining.

---

## Callback response

Resolves to a string containing the room unique identifier.
