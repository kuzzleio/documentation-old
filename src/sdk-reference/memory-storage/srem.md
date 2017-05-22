---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: srem
---

# srem

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.srem('key', ['member1', 'member2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sremPromise('key', ['member1', 'member2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray members = new JSONArray().put("member1").put("member2").put("...");

kuzzle.memoryStorage.srem("key", members, new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->srem('key', ['member1', 'member2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Removes members from a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/srem)

---

## srem(key, members, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `members` | array | List of members to remove from the set |
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

Resolves to an integer containing the number of removed elements.
