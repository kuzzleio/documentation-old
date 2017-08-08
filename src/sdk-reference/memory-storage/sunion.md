---
layout: side-code.html
words:  212
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: sunion
---

# sunion

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sunion(['key1', 'key2', '...'], function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sunionPromise(['key1', 'key2', '...'])
  .then(values => {
    // resolved once the action has completed
  });
```

```java
String[] keys = new String[]{"key1", "key2", "..."};

kuzzle.memoryStorage.sunion(keys, new ResponseListener<String[]>() {
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
  $values = $kuzzle->memoryStorage()->sunion(['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "union value1",
  "union value2",
  "..."
]
```

Returns the union of the provided sets of unique values.

[[_Redis documentation_]](https://redis.io/commands/sunion)

---

## sunion(keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `keys` | string | List of sets of unique values |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to an array of the values in the computed union.
