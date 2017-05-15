---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: geoadd
---

# geoadd

```js
// Using callbacks (NodeJS or Web Browser)
var points = [
  {
    lon: 13.361389,
    lat: 38.115556,
    name: 'Palermo'
  },
  {
    lon: 15.087269,
    lat: 37.502669,
    name: 'Catania'
  }
];

kuzzle.memoryStorage.geoadd('key', points, function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.geoaddPromise('key', points)
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray points = new JSONArray()
  .put(new JSONObject()
    .put("lon", 13.361389)
    .put("lat", 38.115556)
    .put("name", "Palermo")
  )
  .put(new JSONObject()
    .put("lon", 15.087269)
    .put("lat", 37.502669)
    .put("name", "Catania")
  );

kuzzle.memoryStorage.geoadd("key", points, new ResponseListener<Long>() {
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

$points = [
  [
    'lon' => 13.361389,
    'lat' => 38.115556,
    'name' => 'Palermo'
  ],
  [
    'lon' => 15.087269,
    'lat' => 37.502669,
    'name' => 'Catania'
  ]
];

try {
  $count = $kuzzle->memoryStorage()->geoadd('key', points);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Adds geospatial points to the specified key.

[[_Redis documentation_]](https://redis.io/commands/geoadd)

---

## geoadd(key, points, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Destination key identifier |
| `points` | array of objects | List of geospatial points to add. Each point is described by a JSON object containing the following properties:<br/>`lon` (longitude, `float`), `lat` (latitude, `float`), `name` (point identifier, `string`) |
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

Resolves to an integer containing the number of points added to the key
