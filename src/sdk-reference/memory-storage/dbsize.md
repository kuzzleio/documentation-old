---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: dbsize
---

# dbsize

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.dbsize(function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.dbsize()
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.dbsize(new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->dbsize();
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
12
```

Returns the number of keys in the application database.

[[_Redis documentation_]](https://redis.io/commands/dbsize)

---

## dbsize([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to an integer containing the number of keys in the application database
