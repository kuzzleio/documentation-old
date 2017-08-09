---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: rpop
---

# rpop

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.rpop('key', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.rpopPromise('key')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.rpop("key", new ResponseListener<String>() {
  @Override
  public void onSuccess(String value) {
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
  $value = $kuzzle->memoryStorage()->rpop('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"foo"
```

Removes and returns the last element of a list.

[[_Redis documentation_]](https://redis.io/commands/rpop)

---

## rpop(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


---

## Return value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback response

Resolves to the value of the removed item.
