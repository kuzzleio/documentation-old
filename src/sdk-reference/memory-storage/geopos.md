---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: geopos
---

# geopos

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.geopos('key', ['Palermo', 'Catania'], function (err, positions) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.geoposPromise('key', ['Palermo', 'Catania'])
  .then(positions => {
    // resolved once the action has completed
  });
```

```java
JSONArray members = new JSONArray().put("Palermo").put("Catania");
kuzzle.memoryStorage.geopos("key", members, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray positions) {
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
  $positions = $kuzzle->memoryStorage()->geopos('key', ['Palermo', 'Catania']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[ [13.361389, 38.115556], [15.087269, 37.502669]]
```


Returns the positions (longitude, latitude) of the provided key's members (see [geoadd]({{ site_base_path }}sdk-reference/memory-storage/geoadd)).  

[[_Redis documentation_]](https://redis.io/commands/geopos)

---

## geopos(key, members, [options], callback)

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
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to an array of longitude-latitude pairs, in the same order than the provided members list.  
