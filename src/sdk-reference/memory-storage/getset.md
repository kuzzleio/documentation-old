---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getset
---

# getset

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.getset('key', 'new value', function (err, oldValue) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.getsetPromise('key', 'new value')
  .then(oldValue => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.getset("key", "new value", new ResponseListener<String>() {
  @Override
  public void onSuccess(String oldValue) {
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
  $oldValue = $kuzzle->memoryStorage()->getset('key', 'oldValue');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"value"
```

Sets a new value for a key and returns its previous value.

[[_Redis documentation_]](https://redis.io/commands/getset)

---

## getset(key, value, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `value` | string | Key's new value |
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

Resolves to the key's previous value.
