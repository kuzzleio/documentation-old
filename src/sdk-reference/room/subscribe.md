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
room.subscribe(function (err, res) {
  // handles the subscription result
});
```

```java
room.renew(new ResponseListener<Room>() {
  // Handle the subscription result
});
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Renew the subscription. Force a new subscription using the same filters.

Unsubscribes first if this `Room` object was already listening to events.

---

## subscribe([options], subscriptionCallback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``subscriptionCallback`` | function | Function called with the subscription result |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
