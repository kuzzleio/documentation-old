---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: incrbyfloat
---

# incrbyfloat

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.incrbyfloat('key', -3.14159, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.incrbyfloatPromise('key', -3.14159)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.incrbyfloat("key", -3.14159, new ResponseListener<Double>() {
  @Override
  public void onSuccess(double value) {
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
  $value = $kuzzle->memoryStorage()->incrbyfloat('key', -3.14159);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
38.85841
```

Increments the number stored at `key` by the provided float value. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/incrbyfloat)

---

## incrbyfloat(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | double | Increment value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback response

Resolves to a floating point number containing the updated key value
