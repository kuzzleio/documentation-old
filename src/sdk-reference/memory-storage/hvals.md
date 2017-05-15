---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hvals
---

# hvals

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hvals('key', function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hvalsPromise('key')
  .then(values => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hvals("key", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray values) {
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
  $values = $kuzzle->memoryStorage()->hvals('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "field1's value",
  "field2's value",
  "..."
]
```

Returns all values contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hvals)

---

## hvals(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to an array containing the values of a hash.
