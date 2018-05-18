---
layout: side-code.html.handlebars
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
kuzzle.memoryStorage.pfmerge('key', ['key1', 'key2', '...'], function (err) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pfmergePromise('key', ['key1', 'key2', '...'])
  .then(() => {
    // resolved once the action has completed
  });
```

```java
String[] keys = new String[]{"key1", "key2", "..."};

kuzzle.memoryStorage.pfmerge('key', keys, new ResponseListener<Void>() {
  @Override
  public void onSuccess(Void v) {
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
  $kuzzle->memoryStorage()->pfmerge('key', ['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
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
| `queuable` | boolean | Make this request queuable or not  | `true` |


---

## Callback Response

Returns null if successful.