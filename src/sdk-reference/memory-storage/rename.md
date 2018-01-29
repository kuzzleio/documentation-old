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
kuzzle.memoryStorage.rename('key', 'newId', function (err) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.renamePromise('key', 'newId')
  .then(() => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.rename("key", "newId", new ResponseListener<Void>() {
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
  $kuzzle->memoryStorage()->rename('key', 'newId');
}
catch (ErrorException $e) {

}
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
| `queuable` | boolean | Make this request queuable or not  | ``true`` |


---

## Return value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback response

Resolves if successful. No value is returned.
