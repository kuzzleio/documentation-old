---
layout: side-code.html
words:  283
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: mset
---

# mset

```js
var entries = [
  {key: 'key1', value: 'foo'},
  {key: 'key2', value: 'bar'},
  {key: '...', value: '...'}
];

// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.mset(entries, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.msetPromise(entries)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
JSONObject[] entries = new JSONObject[]{
  new JSONObject().put("key", "key1").put("value", "foo"),
  new JSONObject().put("key", "key2").put("value", "bar"),
  new JSONObject().put("key", "...").put("value", "...")
};

kuzzle.memoryStorage.mset(entries, new ResponseListener<String>() {
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
  $status = $kuzzle->memoryStorage()->mset(entries);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Sets the provided keys to their respective values. If a key does not exist, it is created. Otherwise, the key’s value is overwritten.

[[_Redis documentation_]](https://redis.io/commands/mset)

---

## mset(entries, [options], [callback])

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

Resolves to a simple "OK" string.
