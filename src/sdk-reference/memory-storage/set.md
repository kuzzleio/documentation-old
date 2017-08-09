---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: set
---

# set

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.set('key', 'value', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.setPromise('key', 'value')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.set("key", "value", new ResponseListener<String>() {
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
  $status = $kuzzle->memoryStorage()->set('key', 'value');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Creates a key holding the provided value, or overwrites it if it already exists.

[[_Redis documentation_]](https://redis.io/commands/set)

---

## set(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to store |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `ex` | int | Time to live of the key, in seconds | `0` |
| `nx` | boolean | Set the key only if it does not already exist | `false` |
| `px` | int | Time to live of the key, in milliseconds | `0` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |
| `xx` | boolean | Set the key only if it already exists | `false` |


---

## Return value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback response

Resolves to a simple "OK" string.
