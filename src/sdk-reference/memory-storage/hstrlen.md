---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hstrlen
---

# hstrlen

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hstrlen('key', 'field', function (err, length) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hstrlenPromise('key', 'field')
  .then(length => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hstrlen("key", "field", new ResponseListener<Long>() {
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
  $length = $kuzzle->memoryStorage()->hstrlen('key', 'field');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Returns the string length of a field’s value in a hash.

[[_Redis documentation_]](https://redis.io/commands/hstrlen)

---

## hstrlen(key, field, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Hash field name |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to the string length of a field's value.
