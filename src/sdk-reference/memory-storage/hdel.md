---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hdel
---

# hdel

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hdel('key', ['field1', 'field2'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hdelPromise('key', ['field1', 'field2'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray fields = new JSONArray().put("field1").put("field2");
kuzzle.memoryStorage.hdel("key", fields, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
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
  $count = $kuzzle->memoryStorage()->hdel('key', ['field1', 'field2']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Removes fields from a hash.

[[_Redis documentation_]](https://redis.io/commands/hdel)

---

## hdel(key, fields, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `fields` | array | List of field names to delete |
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

Resolves to the number of removed fields.
