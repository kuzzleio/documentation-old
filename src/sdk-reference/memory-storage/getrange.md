---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getrange
---

# getrange

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.getrange('key', 2, 4, function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.getrangePromise('key', 2, 4)
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.getrange("key", 2, 4, new ResponseListener<String>() {
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
  $value = $kuzzle->memoryStorage()->getrange('key', 2, 4);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"lue"
```

Returns a substring of a key's value (index starts at position `0`).

[[_Redis documentation_]](https://redis.io/commands/getrange)

---

## getrange(key, start, end, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `start` | int | Starting index |
| `end` | int | Ending index |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to a substring of the key's value.
