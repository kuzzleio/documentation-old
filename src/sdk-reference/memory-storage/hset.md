---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hset
---

# hset

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hset('key', 'field', 'value', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hsetPromise('key', 'field', 'value')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hset("key", "field", "value", new ResponseListener<Integer>() {
  @Override
  public void onSuccess(Integer status) {
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
  $status = $kuzzle->memoryStorage()->hset('key', 'field', 'value');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets a field and its value in a hash. If the key does not exist, a new key holding a hash is created. If the field already exists, its value is overwritten.

[[_Redis documentation_]](https://redis.io/commands/hset)

---

## hset(key, field, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Field name to insert or to update |
| `value` | string | Associated field value |
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
