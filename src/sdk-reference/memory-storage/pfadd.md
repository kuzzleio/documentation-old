---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: pfadd
---

# pfadd

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.pfadd('key', ['foo', 'bar', 'baz'], function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pfaddPromise('key', ['foo', 'bar', 'baz'])
  .then(status => {
    // resolved once the action has completed
  });
```

```java
JSONArray elements = new JSONArray().put("foo").put("bar").put("baz");

kuzzle.memoryStorage.pfadd("key", elements, new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
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
  $status = $kuzzle->memoryStorage()->pfadd('key', ['foo', 'bar', 'baz']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Adds elements to an [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structure.

[[_Redis documentation_]](https://redis.io/commands/pfadd)

---

## pfadd(key, elements, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `elements` | array | Elements to add to the HyperLogLog structure |
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

Resolves to an integer containing the operation status (`0`: fail, `1`: success).
