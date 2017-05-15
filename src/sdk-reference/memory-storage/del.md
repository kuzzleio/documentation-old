---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: del
---

# del

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.del(['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.delPromise(['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray keys = new JSONArray().put("key1").put("key2").put("...");
kuzzle.memoryStorage.del(keys, new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->del(['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Deletes a list of keys.

[[_Redis documentation_]](https://redis.io/commands/del)

---

## del(keys, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `keys` | array | List of keys to delete |
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

Resolves to an integer containing the number of deleted keys.
