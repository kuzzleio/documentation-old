---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setex
---

# setex

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.setex('key', 'value', 42, function (err) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.setexPromise('key', 'value', 42)
  .then(() => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.setex("key", "value", 42, new ResponseListener<Void>() {
  @Override
  public void onSuccess(Void v) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->memoryStorage()->setex('key', 'value', 42);
}
catch (ErrorException $e) {

}
```

Sets a key with the provided value, and an expiration delay expressed in seconds. If the key does not exist, it is created beforehand.

[[_Redis documentation_]](https://redis.io/commands/setex)

---

## setex(key, value, ttl, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to set |
| `ttl` | int | Time to live of the key, in seconds |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Make this request queuable or not  | ``true`` |


---

## Return Value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback Response

Returns null if successful.