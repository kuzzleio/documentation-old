---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: renamenx
---

# renamenx

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.renamenx('key', 'newId', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.renamenxPromise('key', 'newId')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.renamenx("key", "newId", new ResponseListener<Boolean>() {
  @Override
  public void onSuccess(Boolean status) {
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
  $status = $kuzzle->memoryStorage()->renamenx('key', 'newId');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
true
```

Renames a key to `newkey`, only if `newkey` does not already exist.

[[_Redis documentation_]](https://redis.io/commands/renamenx)

---

## renamenx(key, newkey, [options], [callback])

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

## Return Value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback Response

Returns a boolean specifying if the operation was successful or not.
