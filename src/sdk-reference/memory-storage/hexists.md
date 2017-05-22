---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hexists
---

# hexists

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hexists('key', 'field1', function (err, exists) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hexistsPromise('key', 'field1')
  .then(exists => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hexists("key", "field1", new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int exists) {
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
  $exists = $kuzzle->memoryStorage()->hexists('key', 'field1');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Checks if a field exists in a hash.

[[_Redis documentation_]](https://redis.io/commands/hexists)

---

## hexists(key, field, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Field name |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

`1` if field exists, `0` otherwise.
