---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hmset
---

# hmset

```js
var entries = [
  {"field": "field1", "value": "foo"},
  {"field": "field2", "value": "bar"},
  {"field": "...", "value": "..."}
];

// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hmset('key', entries, function (err, status) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hmsetPromise('key', entries)
  .then(status => {
    // resolved once the action has completed
  });
```

```java
JSONArray entries = new JSONArray()
  .put(new JSONObject().put("field", "field1").put("value", "foo"))
  .put(new JSONObject().put("field", "field2").put("value", "bar"))
  .put(new JSONObject().put("field", "...").put("value", "..."));

kuzzle.memoryStorage.hmset("key", entries, new ResponseListener<String>() {
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
  ['field' => 'field1', 'value' => 'foo'],
  ['field' => 'field2', 'value' => 'bar'],
  ['field' => '...', 'value' => '...']
];

try {
  $status = $kuzzle->memoryStorage()->hmset('key', entries);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"OK"
```

Sets multiple fields at once in a hash.

[[_Redis documentation_]](https://redis.io/commands/hmset)

---

## hmset(key, entries, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `entries` | array | List of fields to add, with their value. Each entry is described by a JSON object containing the following properties:<br/>`field` (field name), `value` (field's value) |
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
