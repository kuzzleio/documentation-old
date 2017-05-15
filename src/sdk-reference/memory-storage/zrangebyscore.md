---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zrangebyscore
---

# zrangebyscore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrangebyscore('key', 2, 3, function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrangebyscorePromise('key', 2, 3)
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrangebyscore("key", 2, 3, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray members) {
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
  $members = $kuzzle->memoryStorage()->zrangebyscore('key', 2, 3);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  { "member": "foo", "score": 1 },
  { "member": "bar", "score": 2 },
  { "member": "baz", "score": 3 }
]
```

Returns all the elements in the sorted set at key with a score between `min` and `max` (inclusive). The elements are considered to be ordered from low to high scores.

[[_Redis documentation_]](https://redis.io/commands/zrangebyscore)

---

## zrangebyscore(key, min, max, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | double | Minimum score value (inclusive by default) |
| `max` | double | Maximum score value (inclusive by default) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `limit` | array | Limit the result set to a range of matching elements (similar to _SELECT LIMIT offset, count_ in SQL).<br/>Format: `[<offset(int)>, <count(int)>]` | `null` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


---

## Return value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback response

Resolves to an array of matching members.
