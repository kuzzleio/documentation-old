---
layout: side-code.html.hbs
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
kuzzle.memoryStorage.sismember('key', 'member', function (err, isMember) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.sismemberPromise('key', 'member')
  .then(isMember => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.sismember("key", "member", new ResponseListener<Boolean>() {
  @Override
  public void onSuccess(Boolean isMember) {
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
  $isMember = $kuzzle->memoryStorage()->sismember('key', 'member');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
true
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
| `queuable` | boolean | Make this request queuable or not  | `true` |


---

## Callback Response

Returns a boolean specifying if `member` is a member of the set or not.

