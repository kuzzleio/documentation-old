---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setnx
---

# setnx

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.setnx('key', 'value', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.setnxPromise('key', 'value')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.setnx("key", "value", new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
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
  $status = $kuzzle->memoryStorage()->setnx('key', 'value');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets a value on a key, only if it does not already exist.

[[_Redis documentation_]](https://redis.io/commands/setnx)

---

## setnx(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to store |
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

Resolves to an integer indicating if the insertion succeeded (`1`) or failed (`0`).
