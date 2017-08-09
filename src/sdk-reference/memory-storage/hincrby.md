---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hincrby
---

# hincrby

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hincrby('key', 'field', 42, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hincrbyPromise('key', 'field', 42)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hincrby("key", "field", 42, new ResponseListener<Long>() {
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
  $value = $kuzzle->memoryStorage()->hincrby('key', 'field', 42);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
45
```

Increments the number stored in a hash field by the provided integer value.

[[_Redis documentation_]](https://redis.io/commands/hincrby)

---

## hincrby(key, field, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Hash field to increment |
| `value` | int | Increment value |
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

Resolves to the new incremented value.
