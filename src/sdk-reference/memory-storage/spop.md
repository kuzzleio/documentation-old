---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: spop
---

# spop

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.spop('key', function (err, elements) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.spopPromise('key')
  .then(elements => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.spop("key", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray elements) {
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
  $elements = $kuzzle->memoryStorage()->spop('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[ "removed element" ]
```

Removes and returns one or more elements at random from a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/spop)

---

## spop(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `count` | int | Number of elements to remove | `1` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |


---

## Return value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback response

Resolves to an array of removed elements.
