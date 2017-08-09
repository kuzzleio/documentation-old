---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: linsert
---

# linsert

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.linsert('key', 'after', 'foo', 'bar', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.linsertPromise('key', 'after', 'foo', 'bar')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.linsert("key", "after", "foo", "bar", new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->linsert('key', 'after', 'foo', 'bar');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Inserts a value in a list, either before or after the reference pivot value.

[[_Redis documentation_]](https://redis.io/commands/linsert)

---

## linsert(key, position, pivot, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `position` | string | Indicates if the new value is to be inserted before or after the pivot value.<br/>Allowed values: `before`, `after` |
| `pivot` | string | Pivot value used as a point of reference in the list |
| `value` | string | The value to insert |
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

Resolves to an integer containing the updated number of items in the list.
