---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zcard
---

# zcard

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zcard('key', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zcardPromise('key')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zcard("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
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
  $count = $kuzzle->memoryStorage()->zcard('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Returns the number of elements held by a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zcard)

---

## zcard(key, [options], callback)

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

Resolves to an integer containing the number of elements in a sorted set.
