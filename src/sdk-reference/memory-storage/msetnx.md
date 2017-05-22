---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: msetnx
---

# msetnx

```js
var entries = [
  {key: 'key1', value: 'foo'},
  {key: 'key2', value: 'bar'},
  {key: '...', value: '...'}
];

// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.msetnx(entries, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.msetnxPromise(entries)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
JSONArray entries = new JSONArray()
  .put(new JSONObject().put("key", "key1").put("value", "foo"))
  .put(new JSONObject().put("key", "key2").put("value", "bar"))
  .put(new JSONObject().put("key", "...").put("value", "..."));

kuzzle.memoryStorage.msetnx(entries, new ResponseListener<Integer>() {
  @Override
  public void onSuccess(String status) {
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

$entries = [
  ['key' => 'key1', 'value' => 'foo'],
  ['key' => 'key2', 'value' => 'bar'],
  ['key' => '...', 'value' => '...']
];

try {
  $status = $kuzzle->memoryStorage()->msetnx(entries);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Sets the provided keys to their respective values, only if they do not exist. If a key exists, then the whole operation is aborted and no key is set.

[[_Redis documentation_]](https://redis.io/commands/msetnx)

---

## msetnx(entries, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `entries` | array | List of objects each containing the key identifier to add with its associated value.<br/>Properties: `key` (key identifier), `value` (associated value)  |
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
