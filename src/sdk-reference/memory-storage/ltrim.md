---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: ltrim
---

# ltrim

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.ltrim('key', 1, 2, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.ltrimPromise('key', 1, 2)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.ltrim("key", 1, 2, new ResponseListener<String>() {
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
  $status = $kuzzle->memoryStorage()->ltrim('key', 1, 2);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Trims an existing list so that it will contain only the specified range of elements specified.

[[_Redis documentation_]](https://redis.io/commands/ltrim)

---

## ltrim(key, start, stop, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `start` | int | Starting position of the range of items to keep (inclusive) |
| `stop` | int | Ending position of the range of items to keep (inclusive) |
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
