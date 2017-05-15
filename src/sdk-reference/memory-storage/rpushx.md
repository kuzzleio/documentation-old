---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: rpushx
---

# rpushx

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.rpushx('key', 'foo', function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.rpushxPromise('key', 'foo')
  .then(count => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.rpushx("key", "foo", new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->rpushx('key', 'foo');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
4
```

Appends the specified value at the end of a list, only if the key already exists and if it holds a list.

[[_Redis documentation_]](https://redis.io/commands/rpushx)

---

## rpushx(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Value to add at the end of the list |
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
