---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zincrby
---

# zincrby

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zincrby('key', 'foo', 3.14159, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zincrbyPromise('key', 'foo', 3.14159)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zincrby("key", "foo", 3.14159, new ResponseListener<double>() {
  @Override
  public void onSuccess(double value) {
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
  $value = $kuzzle->memoryStorage()->zincrby('key', 'foo', 3.14159);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4.14159
```

Increments the score of a `member` in a sorted set by the provided `value`.

[[_Redis documentation_]](https://redis.io/commands/zincrby)

---

## zincrby(key, member, increment, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member` | string | Member element to increment |
| `increment` | double | Increment value |
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

Resolves to a double containing the updated member's score in the sorted set.
