---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hscan
---

# hscan

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.hscan('key', 0, function (err, page) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.hscanPromise('key', 0)
  .then(page => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.hscan("key", 0, new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray page) {
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
  $page = $kuzzle->memoryStorage()->hscan('key', 0);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  18,
  [
    "field1",
    "field1's value",
    "field2",
    "field2's value"
  ]
]
```

Identical to [scan]({{ site_base_path }}sdk-reference/memory-storage/scan), except that `hscan` iterates the fields contained in a hash.  

[[_Redis documentation_]](https://redis.io/commands/hscan)

---

## hscan(key, cursor, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `cursor` | int | Page number (iteration starts with a cursor value of `0`, and ends when the next cursor position is `0`) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `count` | int | Return the _approximate_ `count` number of items per result page | `10` |
| `match` | string | Search only for field names matching the provided pattern | `*` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |

---

## Callback response

Resolves to a JSON array containing 2 entries:

* the cursor position for the next page of results (a next position of `0` indicates the end of the scan)
* a list of, alternatively, field names and their associated value
