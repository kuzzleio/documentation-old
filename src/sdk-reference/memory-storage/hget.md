---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hget
---

# hget

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hget('key', 'field1', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hgetPromise('key', 'field1')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hget("key", "field1", new ResponseListener<String>() {
  @Override
  public void onSuccess(String value) {
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
  $value = $kuzzle->memoryStorage()->hget('key', 'field1');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"foo"
```

Returns the field’s value of a hash.

[[_Redis documentation_]](https://redis.io/commands/hget)

---

## hget(key, field, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `field` | string | Field name |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Returns the requested field's value.
