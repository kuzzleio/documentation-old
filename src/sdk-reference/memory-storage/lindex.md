---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: lindex
---

# lindex

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.lindex('key', 3, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.lindexPromise('key', 3)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.lindex("key", 3, new ResponseListener<String>() {
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
  $value = $kuzzle->memoryStorage()->lindex('key', 3);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"foo"
```

Returns the element at the provided index in a list.

[[_Redis documentation_]](https://redis.io/commands/lindex)

---

## lindex(key, index, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `index` | int | Element position in the list |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to a string containing the retrieved element's value.
