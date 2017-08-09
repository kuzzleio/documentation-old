---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: get
---

# get

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.get('key', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.getPromise('key')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.get("key", new ResponseListener<String>() {
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
  $value = $kuzzle->memoryStorage()->get('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"value"
```

Returns the value of a key, or null if the key doesn’t exist.

[[_Redis documentation_]](https://redis.io/commands/get)

---

## get(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to the key's value.
