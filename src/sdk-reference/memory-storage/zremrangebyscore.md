---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zremrangebyscore
---

# zremrangebyscore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zremrangebyscore('key', 1, 2, function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zremrangebyscorePromise('key', 1, 2)
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zremrangebyscore("key", 1, 2, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
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
  $count = $kuzzle->memoryStorage()->zremrangebyscore('key', 1, 2);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Removes members from a sorted set with a score between `min` and `max` (inclusive by default).

[[_Redis documentation_]](https://redis.io/commands/zremrangebyscore)

---

## zremrangebyscore(key, min, max, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | double | Minimum score (inclusive by default) |
| `max` | double | Maximum score (inclusive by default) |
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

Resolves to an integer containing the number of removed members from the sorted set.
