---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: psetex
---

# psetex

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.psetex('key', 'value', 42000, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.psetexPromise('key', 'value', 42000)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.psetex("key", "value", 42000, new ResponseListener<String>() {
  @Override
  public void onSuccess(String status) {
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
  $status = $kuzzle->memoryStorage()->psetex('key', 'value', 42000);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Sets a key with the provided value, and an expiration delay expressed in milliseconds. If the key does not exist, it is created beforehand.

[[_Redis documentation_]](https://redis.io/commands/psetex)

---

## psetex(key, value, ttl, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to set |
| `ttl` | int | Time to live of the key, in milliseconds |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


---

## Return value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback response

Resolves to a simple "OK" string.
