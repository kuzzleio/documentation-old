---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zlexcount
---

# zlexcount

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zlexcount('key', '[b', '[f' function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zlexcountPromise('key', '[b', '[f')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zlexcount("key", "[b", "[f", new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->zlexcount('key', '[b', '[f');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Counts elements in a sorted set where all members have equal score, using lexicographical ordering. The `min` and `max` values are inclusive by default. To change this behavior, please check the syntax detailed in the [Redis documentation](https://redis.io/commands/zrangebylex).

[[_Redis documentation_]](https://redis.io/commands/zlexcount)

---

## zlexcount(key, min, max, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `min` | string | Minimum member value (inclusive by default) |
| `max` | string | Maximum member value (inclusive by default) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to an integer containing the number of elements in the provided lexicographical value range.
