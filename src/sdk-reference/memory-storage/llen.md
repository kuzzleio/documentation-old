---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: llen
---

# llen

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.llen('key', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.llenPromise('key')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.llen("key", new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->llen('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Counts the number of items in a list.

[[_Redis documentation_]](https://redis.io/commands/llen)

---

## llen(key, [options], callback)

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

Resolves to an integer containing the number of items of a list.
