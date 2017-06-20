---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: smove
---

# smove

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.smove('key', 'destination', 'member', function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.smovePromise('key', 'destination', 'member')
  .then(status => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.smove("key", "destination", "member", new ResponseListener<Integer>() {
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
  $status = $kuzzle->memoryStorage()->smove('key', 'destination', 'member');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Moves a member from a set of unique values to another.

[[_Redis documentation_]](https://redis.io/commands/smove)

---

## smove(key, destination, member, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Source key identifier |
| `destination` | string | Destination key identifier |
| `member` | string | Member to be moved |
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

Resolves to an integer containing the operation status (`0`: fail, `1`: success).
