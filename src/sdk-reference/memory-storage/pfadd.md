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
String[] elements = new String[]{"foo", "bar", "baz"};

kuzzle.memoryStorage.pfadd("key", elements, new ResponseListener<Boolean>() {
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
  $status = $kuzzle->memoryStorage()->pfadd('key', ['foo', 'bar', 'baz']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
true
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
| `queuable` | boolean | Make this request queuable or not  | ``true`` |


---

## Return Value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback Response

Returns a boolean specifying if the operation was successful or not.
