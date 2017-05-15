---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zunionstore
---

# zunionstore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zunionstore('destination', ['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zunionstorePromise('destination', ['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");

kuzzle.memoryStorage.zunionstore("destination", keys, new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->zunionstore('destination', ['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Computes the union of the provided sorted sets and stores the result in the `destination` key.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/zunionstore)

---

## zunionstore(destination, keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `destination` | string | Destination key identifier |
| `keys` | string | List of sorted sets to intersect |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `aggregate` | string | Specify how members' scores are aggregated during the intersection.<br/>Allowed values: `min`, `max`, `sum` | `sum` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |
| `weights` | array | Specify a multiplication factor for each input sorted set | `[1]` |


---

## Callback response

Resolves to an integer containing the number of members in the stored union.
