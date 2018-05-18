---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: decr
---

# decr

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.decr('key', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.decrPromise('key')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.decr("key", new ResponseListener<Long>() {
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
  $value = $kuzzle->memoryStorage()->decr('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
-1
```

Decrements the number stored at `key` by 1. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/decr)

---

## decr(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Make this request queuable or not  | ``true`` |

---

## Return Value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback Response

Returns an integer containing the updated key value.
