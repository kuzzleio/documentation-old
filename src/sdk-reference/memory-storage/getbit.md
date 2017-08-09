---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getbit
---

# getbit

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.getbit('key', 10, function (err, bit) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.getbitPromise('key', 10)
  .then(bit => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.getbit("key", 10, new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int bit) {
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
  $bit = $kuzzle->memoryStorage()->getbit('key', 10);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Returns the bit value at `offset`, in the string value stored in a key.

[[_Redis documentation_]](https://redis.io/commands/getbit)

---

## getbit(key, offset, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `offset` | int | Offset position in the key's value |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to the bit value at the provided offset.
