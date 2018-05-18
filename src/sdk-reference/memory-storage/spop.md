---
layout: side-code.html.handlebars
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
kuzzle.memoryStorage.spop("key", new ResponseListener<String[]>() {
  @Override
  public void onSuccess(String[] elements) {
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
| `queuable` | boolean | Make this request queuable or not  | ``true`` |


---

## Return Value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback Response

Returns an array of removed elements.
