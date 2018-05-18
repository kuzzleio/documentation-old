---
layout: side-code.html.handlebars
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
kuzzle.memoryStorage.smove("key", "destination", "member", new ResponseListener<Boolean>() {
  @Override
  public void onSuccess(Boolean status) {
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
true
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
| `queuable` | boolean | Make this request queuable or not  | ``true`` |


---

## Return Value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback Response

Returns a boolean specifying if the operation was successful or not.
