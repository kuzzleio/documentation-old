---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: geohash
---

# geohash

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.geohash('key', ['Palermo', 'Catania'], function (err, hashes) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.geohashPromise('key', ['Palermo', 'Catania'])
  .then(hashes => {
    // resolved once the action has completed
  });
```

```java
String[] members = {"Palermo", "Catania"};

kuzzle.memoryStorage.geohash("key", members, new ResponseListener<String[]>() {
  @Override
  public void onSuccess(String[] hashes) {
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
  $hashes = $kuzzle->memoryStorage()->geohash('key', ['Palermo', 'Catania']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
["sqc8b49rny0", "sqdtr74hyu0"]
```

Returns a valid [geohash](https://en.wikipedia.org/wiki/Geohash) for the provided key's members (see [geoadd]({{ site_base_path }}sdk-reference/memory-storage/geoadd)).  

[[_Redis documentation_]](https://redis.io/commands/geohash)

---

## geohash(key, members, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `members` | array | List of geospatial points contained in the key |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Make this request queuable or not  | `true` |

---

## Callback Response

Returns an array of geohashes, in the same order than the provided members list.
