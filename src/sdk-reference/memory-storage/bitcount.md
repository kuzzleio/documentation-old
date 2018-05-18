---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: bitcount
---

# bitcount

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.bitcount('key', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.bitcountPromise('key')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.bitcount("key", new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->bitcount('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
21
```

Counts the number of set bits (population counting) in a string.

[[_Redis documentation_]](https://redis.io/commands/bitcount)

---

## bitcount(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `end` | int | Ending offset | `-1` |
| `queuable` | boolean | Make this request queuable or not  | `true` |
| `start` | int | Starting offset | `0` |

---

## Callback Response

Return an integer containing the count of set bits.
