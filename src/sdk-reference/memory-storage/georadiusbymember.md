---
layout: side-code.html
words:  388
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: georadiusbymember
---

# georadiusbymember

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.georadiusbymember('key', 'Palermo', 200, 'km', function (err, points) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.georadiusbymemberPromise('key', 'Palermo', 200, 'km')
  .then(points => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.georadiusbymember("key", "Palermo", 200, "km", new ResponseListener<JSONObject[]>() {
  @Override
  public void onSuccess(JSONObject[] points) {
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
  $points = $kuzzle->memoryStorage()->georadiusbymember('key', 'Palermo', 200, 'km');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  {"name": "Palermo"},
  {"name": "Catania"}
]
```

> Callback response, with the "withcoord" option:

```json
[
  {"name": "Palermo", "coordinates": [13.361389338970184, 38.1155563954963]},
  {"name": "Catania", "coordinates": [15.087267458438873, 37.50266842333162]}
]
```

> Callback response, with the "withdist" option:

```json
[
  {"name": "Palermo", "distance": 190.4424},
  {"name": "Catania", "distance": 56.4413}
]
```

Returns the members (added with [geoadd]({{ site_base_path }}sdk-reference/memory-storage/geoadd)) of a given key inside the provided geospatial radius, centered around one of a key's member.


[[_Redis documentation_]](https://redis.io/commands/georadiusbymember)

---

## georadiusbymember(key, member, distance, unit, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member` | string | Name of the point to use as the center of the radius |
| `distance` | double | Maximum distance from the center |
| `unit`  | string | Distance unit |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `count` | int | Limit the result set to `count` members | `null` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |
| `sort` | string | Return items from the nearest to the farthest to the center (`ASC`) or vice versa (`DESC`) | `null` |
| `withcoord` | boolean | Also return the longitude and latitude coordinates of the matching items | `false` |
| `withdist` | boolean | Also return the distance of the returned items from the specified center, in the same unit than the one provided with `unit` | `false` |

---

## Callback response

Resolves to an array of point names inside the provided radius.
