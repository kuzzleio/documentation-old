---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: append
---

# append

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.append('key', 'value', function (err, newLength) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.appendPromise('key', 'value')
  .then(newLength => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.append("key", "value", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int newLength) {
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
  $newLength = $kuzzle->memoryStorage()->append('key', 'value');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
5
```

Appends a value to a key. If the key does not exist, it is created.

[[_Redis documentation_]](https://redis.io/commands/append)

---

## append(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to append to the key |
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

Resolves to an integer containing the new length of the key's value
