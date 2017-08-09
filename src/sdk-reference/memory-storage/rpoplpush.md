---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: rpoplpush
---

# rpoplpush

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.rpoplpush('sourceKey', 'destKey', function (err, value) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.rpoplpushPromise('sourceKey', 'destKey')
  .then(value => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.rpoplpush("sourceKey", "destKey", new ResponseListener<String>() {
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
  $value = $kuzzle->memoryStorage()->rpoplpush('sourceKey', 'destKey');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"foo"
```

Removes the last element of the list at `source` and pushes it back at the start of the list at `destination`.

[[_Redis documentation_]](https://redis.io/commands/rpoplpush)

---

## rpoplpush(source, destination, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `source` | string | Source key identifier |
| `destination` | string | Destination key identifier |
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

Resolves to the value of the removed and pushed item.
