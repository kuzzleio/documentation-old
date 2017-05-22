---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zrevrange
---

# zrevrange

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrevrange('key', 0, -1, function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrevrangePromise('key', 0, -1)
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrevrange("key", 0, -1, new ResponseListener<JSONArray>() {
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
  $members = $kuzzle->memoryStorage()->zrevrange('key', 0, -1);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  { "member": "baz", "score": 3 },
  { "member": "bar", "score": 2 },
  { "member": "foo", "score": 1 }
]
```

Identical to [zrange]({{ site_base_path }}sdk-reference/memory-storage/zrange), except that the sorted set is traversed in descending order.

[[_Redis documentation_]](https://redis.io/commands/zrevrange)

---

## zrevrange(key, start, stop, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `start` | int | Start position in the set (index starts at position `0`) |
| `stop` | int | End position in the set |
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

Resolves to an array of objects, each containing the following properties:

* `member`: member value in the sorted set
* `score`: member associated score
