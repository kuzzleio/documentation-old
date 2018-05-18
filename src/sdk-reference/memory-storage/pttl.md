---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: pttl
---

# pttl

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.pttl('key', function (err, ttl) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pttlPromise('key')
  .then(ttl => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.pttl("key", new ResponseListener<Long>() {
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
  $ttl = $kuzzle->memoryStorage()->pttl('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
43159
```

Returns the remaining time to live of a key, in milliseconds.

[[_Redis documentation_]](https://redis.io/commands/pttl)

---

## pttl(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Make this request queuable or not  | `true` |


---

## Callback Response

Returns an integer containing the remaining time to live of the key, in milliseconds.
