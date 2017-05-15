---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hmget
---

# hmget

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hmget('key', ['field1', 'field2', '...'], function (err, values) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hmgetPromise('key', ['field1', 'field2', '...'])
  .then(values => {
    // resolved once the action has completed
  });
```

```java
JSONArray fields = new JSONArray().put("field1").put("field2");

kuzzle.memoryStorage.hmget("key", fields, new ResponseListener<JSONArray>() {
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
  $values = $kuzzle->memoryStorage()->hmget('key', ['field1', 'field2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "field1's value",
  "field2's value",
  "..."
]
```

Returns the values of the specified hash’s fields.

[[_Redis documentation_]](https://redis.io/commands/hmget)

---

## hmget(key, fields, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `fields` | array | List of fields to examine |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to an array containing the specified fields values.
