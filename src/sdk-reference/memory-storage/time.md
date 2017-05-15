---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: time
---

# time

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.time(function (err, result) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.timePromise()
  .then(result => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.time(new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray result) {
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
  $result = $kuzzle->memoryStorage()->time();
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
[
  1488791347,
  494938
]
```

Returns the current server time.

[[_Redis documentation_]](https://redis.io/commands/time)

---

## time([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to an array containing the following two items, in this order:

* a timestamp in [Epoch time](https://en.wikipedia.org/wiki/Unix_time)
* the number of microseconds already elapsed in the current second
