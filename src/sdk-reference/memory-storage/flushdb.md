---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: flushdb
---

# flushdb

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.flushdb(function (err) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.flushdbPromise()
  .then(() => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.flushdb(new ResponseListener<Void>() {
  @Override
  public void onSuccess(Void v) {
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
  $kuzzle->memoryStorage()->flushdb();
}
catch (ErrorException $e) {

}
```

Deletes all the keys of the database dedicated to client applications (the reserved space for Kuzzle is unaffected).

[[_Redis documentation_]](https://redis.io/commands/flushdb)

---

## flushdb([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback response

Resolves if successful. No value is returned.
