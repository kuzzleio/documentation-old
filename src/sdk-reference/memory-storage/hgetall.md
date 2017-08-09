---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hgetall
---

# hgetall

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hgetall('key', function (err, hash) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hgetallPromise('key')
  .then(hash => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hgetall("key", new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject hash) {
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
  $hash = $kuzzle->memoryStorage()->hgetall('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{
  "field1": "value",
  "field2": "value",
  "...": "..."
}
```

Returns all fields and values of a hash.

[[_Redis documentation_]](https://redis.io/commands/hgetall)

---

## hgetall(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to a JSON object containing the fields and values of a hash.
