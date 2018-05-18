---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: exists
---

# exists

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.exists(['key1', 'key2', '...'], function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.existsPromise(['key1', 'key2', '...'])
  .then(count => {
    // resolved once the action has completed
  });
```

```java
String[] keys = {"key1", "key2", "..."};

kuzzle.memoryStorage.exists(keys, new ResponseListener<Long>() {
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
  $count = $kuzzle->memoryStorage()->exists(['key1', 'key2', '...']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
2
```

Checks if the specified keys exist in the database.

[[_Redis documentation_]](https://redis.io/commands/exists)

---

## exists(keys, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `keys` | array | List of keys to check for existence |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Make this request queuable or not  | `true` |

---

## Callback Response

Returns an integer containing the number of existing keys amongst the provided list.
