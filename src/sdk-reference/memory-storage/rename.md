---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: rename
---

# rename

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.rename('key', 'newId', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.renamePromise('key', 'newId')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.rename("key", "newId", new ResponseListener<String>() {
  @Override
  public void onSuccess(String status) {
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
  $status = $kuzzle->memoryStorage()->rename('key', 'newId');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Renames a key to `newkey`. If `newkey` already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/rename)

---

## rename(key, newkey, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `newkey` | string | New key identifier |
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

Resolves to a simple "OK" string.
