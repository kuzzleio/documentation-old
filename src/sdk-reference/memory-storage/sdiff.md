---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: sdiff
---

# sdiff

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sdiff('key', ['key1', 'key2', '...'], function (err, diff) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sdiffPromise('key', ['key1', 'key2', '...'])
  .then(diff => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.sdiff("key", keys, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray diff) {
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
  $diff = $kuzzle->memoryStorage()->sdiff('key', ['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "diff value1",
  "diff value2",
  "..."
]
```


Returns the difference between the set of unique values stored at `key` and the other provided sets.

[[_Redis documentation_]](https://redis.io/commands/sdiff)

---

## sdiff(key, keys, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier to compare |
| `keys` | array | list of set keys to compare with the set stored at `key` |
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

Resolves to an array of differences.
