---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: pexpire
---

# pexpire

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.pexpire('key', 42000, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pexpirePromise('key', 42000)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.pexpire("key", 42000, new ResponseListener<Integer>() {
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
  $status = $kuzzle->memoryStorage()->pexpire('key', 42000);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets a timeout (in milliseconds) on a key. After the timeout has expired, the key will automatically be deleted.

[[_Redis documentation_]](https://redis.io/commands/pexpire)

---

## pexpire(key, ttl, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `ttl` | int | Time to live of the key, in milliseconds |
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

Resolves to an integer containing the operation status (`0`: fail, `1`: success).
