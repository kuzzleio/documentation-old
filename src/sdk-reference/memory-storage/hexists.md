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
kuzzle.memoryStorage.hexists("key", "field1", new ResponseListener<Boolean>() {
  @Override
  public void onSuccess(Boolean exists) {
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
true
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
| `queuable` | boolean | Make this request queuable or not  | `true` |

---

## Callback Response

A boolean value specifying if the field exists or not.
