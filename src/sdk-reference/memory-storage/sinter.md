---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: sinter
---

# sinter

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sinter(['key1', 'key2', '...'], function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sinterPromise(['key1', 'key2', '...'])
  .then(values => {
    // resolved once the action has completed
  });
```

```java
String[] keys = new String[]{"key1", "key2", "..."};

kuzzle.memoryStorage.sinter(keys, new ResponseListener<String[]>() {
  @Override
  public void onSuccess(String[] values) {
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
  $values = $kuzzle->memoryStorage()->sinter(['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "intersection value1",
  "intersection value2",
  "..."
]
```

Returns the intersection of the provided sets of unique values.

[[_Redis documentation_]](https://redis.io/commands/sinter)

---

## sinter(keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `keys` | string | List of sets of unique values to intersect |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Make this request queuable or not  | `true` |


---

## Callback Response

Returns an array of values in the computed intersection.
