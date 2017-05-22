---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: strlen
---

# strlen

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.strlen('key', function (err, length) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.strlenPromise('key')
  .then(length => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.strlen("key", new ResponseListener<Long>() {
  @Override
  public void onSuccess(int length) {
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
  $length = $kuzzle->memoryStorage()->strlen('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
13
```

Returns the length of a value stored at `key`.

[[_Redis documentation_]](https://redis.io/commands/strlen)

---

## strlen(key, [options], callback)

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

Resolves to an integer containing the length of a value.
