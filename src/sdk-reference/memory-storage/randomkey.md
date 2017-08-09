---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: randomkey
---

# randomkey

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.randomkey(function (err, key) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.randomkeyPromise()
  .then(key => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.randomkey(new ResponseListener<String>() {
  @Override
  public void onSuccess(String key) {
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
  $key = $kuzzle->memoryStorage()->randomkey();
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"key2"
```

Returns a random key from the memory storage.

[[_Redis documentation_]](https://redis.io/commands/randomkey)

---

## randomkey([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to one of the stored key name, at random.
