---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hkeys
---

# hkeys

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hkeys('key', function (err, fields) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hkeysPromise('key')
  .then(fields => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hkeys("key", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray fields) {
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
  $fields = $kuzzle->memoryStorage()->hkeys('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "field1",
  "field2",
  "..."
]
```

Returns all field names contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hkeys)

---

## hkeys(key, [options], callback)

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

Resolves an array of field names.
