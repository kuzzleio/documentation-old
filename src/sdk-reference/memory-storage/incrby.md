---
layout: side-code.html
words:  227
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: incrby
---

# incrby

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.incrby('key', -3, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.incrbyPromise('key', -3)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.incrby("key", -3, new ResponseListener<Long>() {
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
  $value = $kuzzle->memoryStorage()->incrby('key', -3);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
39
```

Increments the number stored at `key` by the provided integer value. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/incrby)

---

## incrby(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
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

Resolves to an integer containing the updated key value
