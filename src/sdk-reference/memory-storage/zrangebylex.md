---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zrangebylex
---

# zrangebylex

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrangebylex('key', '-', '(g', function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrangebylexPromise('key', '-', '(g')
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrangebylex("key", "-", "(g", new ResponseListener<JSONArray>() {
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
  $members = $kuzzle->memoryStorage()->zrangebylex('key', '-', '(g');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "member1",
  "member2",
  "..."
]
```

Returns elements in a sorted set where all members have equal score, using lexicographical ordering. The `min` and `max` values are inclusive by default. To change this behavior, please check the full documentation.

[[_Redis documentation_]](https://redis.io/commands/zrangebylex)

---

## zrangebylex(key, min, max, [options], [callback])

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
| `limit` | array | Limit the result set to a range of matching elements (similar to _SELECT LIMIT offset, count_ in SQL).<br/>Format: `[<offset(int)>, <count(int)>]` | `null` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


---

## Return value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback response

Resolves to an array of matching members.
