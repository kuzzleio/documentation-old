---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: pexpireat
---

# pexpireat

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.pexpireat('key', 1488540242465, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pexpireatPromise('key', 1488540242465)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.pexpireat("key", 1488540242465, new ResponseListener<Integer>() {
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
  $status = $kuzzle->memoryStorage()->pexpireat('key', 1488540242465);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets an expiration timestamp on a key. After the timestamp has been reached, the key will automatically be deleted.  
The `timestamp` parameter accepts an [Epoch time](https://en.wikipedia.org/wiki/Unix_time) value, in milliseconds.

[[_Redis documentation_]](https://redis.io/commands/pexpireat)

---

## pexpireat(key, timestamp, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `timestamp` | int | Key's expiration timestamp, in milliseconds |
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
