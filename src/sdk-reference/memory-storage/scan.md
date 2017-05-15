---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: scan
---

# scan

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.scan(0, function (err, page) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.scanPromise(0)
  .then(page => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.scan(0, new ResponseListener<JSONArray>() {
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
  $page = $kuzzle->memoryStorage()->scan(0);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  18,
  [
    "key1",
    "key2",
    "..."
  ]
]
```

Iterates incrementally the set of keys in the database using a cursor.

An iteration starts when the cursor is set to `0`.  
To get the next page of results, simply re-send the identical request with the updated cursor position provided in the result set.  
The scan terminates when the next position cursor returned by the server is `0`.

[[_Redis documentation_]](https://redis.io/commands/scan)

---

## scan(cursor, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
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
* a list of keys
