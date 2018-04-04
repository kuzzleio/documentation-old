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
kuzzle.memoryStorage.pexpire("key", 42000, new ResponseListener<Boolean>() {
  @Override
  public void onSuccess(Boolean status) {
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
true
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
| `queuable` | boolean | Make this request queuable or not  | ``true`` |


---

## Return Value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback Response

Returns a boolean specifying if the operation was successful or not.
