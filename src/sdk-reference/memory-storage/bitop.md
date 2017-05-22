---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: bitop
---

# bitop

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.bitop('key', 'AND', ['srckey1', 'srckey2', '...'], function (err, length) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.bitopPromise('key', 'AND', ['srckey1', 'srckey2', '...'])
  .then(length => {
    // resolved once the action has completed
  });
```

```java
JSONArray sourceKeys = new JSONArray().put("srckey1").put("srckey2").put("...");
kuzzle.memoryStorage.bitop("key", "AND", sourceKeys, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int length) {
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
  $length = $kuzzle->memoryStorage()->bitop('key', 'AND', ['srckey1', 'srckey2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
42
```


Performs a bitwise operation between multiple keys (containing string values) and stores the result in the destination key.

[[_Redis documentation_]](https://redis.io/commands/bitop)

---

## bitop(key, operation, keys, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Destination key identifier |
| `operation` | string | Bitwise operation to perform.<br/>Allowed values: `AND`, `OR`, `XOR`, `NOT` |
| `keys` | array | list of source keys on which the bitwise operation will be applied |
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

Resolves to an integer containing the length of the new key's value
