---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: sdiffstore
---

# sdiffstore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sdiffstore('key', ['key1', 'key2', '...'], 'destination', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sdiffstorePromise('key', ['key1', 'key2', '...'], 'destination')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.sdiffstore("key", keys, "destination", new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->sdiffstore('key', ['key1', 'key2', '...'], 'destination');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```


Computes the difference between the set of unique values stored at `key` and the other provided sets, and stores the result in the key stored at `destination`.

If the `destination` key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sdiffstore)

---

## sdiffstore(key, keys, destination, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier to compare |
| `keys` | array | list of set keys to compare with the set stored at `key` |
| `destination` | string | Destination key identifier |
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

Resolves to an integer containing the number of stored elements.
