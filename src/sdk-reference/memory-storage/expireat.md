---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: expireat
---

# expireat

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.expireat('key', 1488372354, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.expireatPromise('key', 1488372354)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.expireat("key", 1488372354, new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
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
  $status = $kuzzle->memoryStorage()->expireat('key', 1488372354);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets an expiration timestamp on a key. After the timestamp has been reached, the key will automatically be deleted.
The `timestamp` parameter accepts an [Epoch time](https://en.wikipedia.org/wiki/Unix_time) value.

[[_Redis documentation_]](https://redis.io/commands/expireat)

---

## expireat(key, timestamp, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `timestamp` | int | Expiration timestamp |
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

Resolves to an integer containing the operation status (`0`: fail, `1`: success).
