---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hlen
---

# hlen

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hlen('key', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hlenPromise('key')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hlen("key", new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->hlen('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
13
```

Returns the number of fields contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hlen)

---

## hlen(key, [options], callback)

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

Resolves to an integer containing the number of fields in the hash.
