---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hincrbyfloat
---

# hincrbyfloat

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hincrbyfloat('key', 'field', 3.14159, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hincrbyfloatPromise('key', 'field', 3.14159)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hincrbyfloat("key", "field", 3.14159, new ResponseListener<Double>() {
  @Override
  public void onSuccess(int value) {
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
  $value = $kuzzle->memoryStorage()->hincrbyfloat('key', 'field', 3.14159);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
48.14159
```

Increments the number stored in a hash field by the provided float value.

[[_Redis documentation_]](https://redis.io/commands/hincrbyfloat)

---

## hincrbyfloat(key, field, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Hash field to increment |
| `value` | double | Increment value |
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

Resolves to the new incremented value, as a floating point number.
