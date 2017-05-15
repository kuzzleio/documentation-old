---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: keys
---

# keys

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.keys('foo*', function (err, keys) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.keysPromise('foo*')
  .then(keys => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.keys("foo*", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray keys) {
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
  $keys = $kuzzle->memoryStorage()->keys('foo*');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "foo",
  "foobar",
  "foofighters"
]
```

Returns all keys matching the provided pattern.

[[_Redis documentation_]](https://redis.io/commands/keys)

---

## keys(pattern, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `pattern` | string | Pattern used to filter the returned key names |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to an array of key names matching the provided pattern.
