---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zrem
---

# zrem

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrem('key', ['foo', 'bar', 'baz'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zremPromise('key', ['foo', 'bar', 'baz'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray members = new JSONArray().put("foo").put("bar").put("baz");

kuzzle.memoryStorage.zrem("key", members, new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->zrem('key', ['foo', 'bar', 'baz']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Removes members from a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zrem)

---

## zrem(key, members, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `members` | array | List of members to remove |
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

Resolves to an integer containing the number of members removed from the sorted set.
