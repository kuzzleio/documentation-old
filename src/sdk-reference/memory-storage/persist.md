---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: persist
---

# persist

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.persist('key', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.persistPromise('key')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.persist("key", new ResponseListener<Boolean>() {
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
  $status = $kuzzle->memoryStorage()->persist('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
true
```

Removes the expiration delay or timestamp from a key, making it persistent.

[[_Redis documentation_]](https://redis.io/commands/persist)

---

## persist(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

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
