---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: sismember
---

# sismember

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.sismember('key', 'member', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sismemberPromise('key', 'member')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.sismember("key", "member", new ResponseListener<Integer>() {
  @Override
  public void onSuccess(int status) {
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
  $status = $kuzzle->memoryStorage()->sismember('key', 'member');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Checks if `member` is a member of the set of unique values stored at `key`.

[[_Redis documentation_]](https://redis.io/commands/sismember)

---

## sismember(key, member, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member` | string | Value tested against the set of unique values |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to an integer indicating if the provided value is a member of the set (`1`) or not (`0`).
