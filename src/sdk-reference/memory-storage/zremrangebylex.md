---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zremrangebylex
---

# zremrangebylex

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zremrangebylex('key', '[b', '(f', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zremrangebylexPromise('key', '[b', '(f')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zremrangebylex("key", "[b", "(f", new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->zremrangebylex('key', '[b', '(f');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Removes members from a sorted set where all elements have the same score, using lexicographical ordering. The `min` and `max` interval are inclusive, see the [Redis documentation](https://redis.io/commands/zrangebylex) to change this behavior.

[[_Redis documentation_]](https://redis.io/commands/zremrangebylex)

---

## zremrangebylex(key, min, max, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | string | Minimum member value (inclusive by default) |
| `max` | string | Maximum member value (inclusive by default) |
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
