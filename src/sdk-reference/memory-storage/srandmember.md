---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: srandmember
---

# srandmember

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.srandmember('key', function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.srandmemberPromise('key')
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.srandmember("key", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray members) {
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
  $members = $kuzzle->memoryStorage()->srandmember('key');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  "member1",
  "member2",
  "..."
]
```

Returns one or more members of a set of unique values, at random.  
If `count` is provided and is positive, the returned values are unique. If `count` is negative, a set member can be returned multiple times.

[[_Redis documentation_]](https://redis.io/commands/srandmember)

---

## srandmember(key, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `count` | int | Number of members to return. If set with a positive value, the returned values are unique. If `count` is negative, a set member can be returned multiple times | `1` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to an array of members of a set of unique values.
