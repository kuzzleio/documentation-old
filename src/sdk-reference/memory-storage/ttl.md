---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: ttl
---

# ttl

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.ttl('key', function (err, ttl) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.ttlPromise('key')
  .then(ttl => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.ttl("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int ttl) {
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
  $ttl = $kuzzle->memoryStorage()->ttl('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
42
```

Returns the remaining time to live of a key, in seconds, or a negative value if the key does not exist or if it is persistent.

[[_Redis documentation_]](https://redis.io/commands/ttl)

---

## ttl(key, [options], callback)

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

Resolves to an integer containing the remaining time to live of the key, in seconds.
