---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: type
---

# type

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.type('key', function (err, type) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.typePromise('key')
  .then(type => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.type("key", new ResponseListener<String>() {
  @Override
  public void onSuccess(String type) {
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
  $type = $kuzzle->memoryStorage()->type('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"zset"
```

Returns the type of the value held by a key.

[[_Redis documentation_]](https://redis.io/commands/type)

---

## type(key, [options], callback)

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

Resolves to one of the following values: `hash`, `list`, `set`, `string`, `zset`
