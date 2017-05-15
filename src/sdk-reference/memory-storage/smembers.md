---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: smembers
---

# smembers

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.smembers('key', function (err, members) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.smembersPromise('key')
  .then(members => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.smembers("key", new ResponseListener<JSONArray>() {
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
  $members = $kuzzle->memoryStorage()->smembers('key');
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

Returns the members of a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/smembers)

---

## smembers(key, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
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

Resolves to an array of values held by the provided set.
