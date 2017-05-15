---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: lrange
---

# lrange

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.lrange('key', 0, 1, function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.lrangePromise('key', 0, 1)
  .then(values => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.lrange("key", 0, 1, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray values) {
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
  $values = $kuzzle->memoryStorage()->lrange('key', 0, 1);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "foo",
  "bar"
]
```

Returns the list elements between the start and stop positions (inclusive).

[[_Redis documentation_]](https://redis.io/commands/lrange)

---

## lrange(key, start, stop, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `start` | int | Start position |
| `stop` | int | End position |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to an array of retrieved values.
