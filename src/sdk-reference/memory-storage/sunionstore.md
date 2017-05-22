---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: sunionstore
---

# sunionstore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sunionstore('destination', ['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sunionstorePromise('destination', ['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.sunionstore("destination", keys, new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->sunionstore('destination', ['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Computes the union of the provided sets of unique values and stores the result in the `destination` key.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sunionstore)

---

## sunionstore(destination, keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `destination` | string | Destination key identifier |
| `keys` | string | List of sets of unique values to intersect |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to an integer containing the number of elements in the stored union.
