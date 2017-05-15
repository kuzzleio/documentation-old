---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: lrem
---

# lrem

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.lrem('key', 1, 'foo', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.lremPromise('key', 1, 'foo')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.lrem("key", 1, "foo", new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->lrem('key', 1, 'foo');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Removes the first `count` occurences of elements equal to `value` from a list.

[[_Redis documentation_]](https://redis.io/commands/lrem)

---

## lrem(key, count, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `count` | int | Number of occurences of the value to remove |
| `value` | string | Value to be removed from the list |
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

Resolves to an integer containing the number of removed elements.
