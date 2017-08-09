---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: lset
---

# lset

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.lset('key', 2, 'bar', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.lsetPromise('key', 2, 'bar')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.lset("key", 2, "bar", new ResponseListener<String>() {
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
  $status = $kuzzle->memoryStorage()->lset('key', 2, 'bar');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Sets the list element at `index` with the provided value.

[[_Redis documentation_]](https://redis.io/commands/lset)

---

## lset(key, index, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `index` | int | Position of the list to update |
| `value` | string | New value at the provided list index |
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
