---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: geodist
---

# geodist

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.geodist('key', 'Palermo', 'Catania', function (err, distance) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.geodistPromise('key', 'Palermo', 'Catania')
  .then(distance => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.geodist("key", "Palermo", "Catania", new ResponseListener<double>() {
  @Override
  public void onSuccess(double distance) {
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
  $distance = $kuzzle->memoryStorage()->geodist('key', 'Palermo', 'Catania');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
166274.1516
```

Returns the distance between two geospatial members of a key (see [geoadd]({{ site_base_path }}sdk-reference/memory-storage/geoadd)).  
The returned distance is expressed in meters by default.

[[_Redis documentation_]](https://redis.io/commands/geodist)

---

## geodist(key, member1, member2, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member1` | string | Name of the first geospatial point |
| `member2` | string | Name of the second geospatial point |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |
| `unit` | string | Distance unit.<br/>Allowed values: `m`, `km`, `mi`, `ft` | `m` |

---

## Callback response

Resolves to the calculated distance between the two provided geospatial points
