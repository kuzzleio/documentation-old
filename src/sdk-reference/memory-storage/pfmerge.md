---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: pfmerge
---

# pfmerge

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.pfmerge('key', ['key1', 'key2', '...'], function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pfmergePromise('key', ['key1', 'key2', '...'])
  .then(status => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.pfmerge('key', keys, new ResponseListener<Long>() {
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
  $status = $kuzzle->memoryStorage()->pfmerge('key', ['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Merges multiple [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structures into an unique HyperLogLog structure stored at `key`, approximating the cardinality of the union of the source structures.

[[_Redis documentation_]](https://redis.io/commands/pfmerge)

---

## pfmerge(key, sources, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Destination key identifier |
| `sources` | string | List of HyperLogLog source key identifiers |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to a simple "OK" string.
