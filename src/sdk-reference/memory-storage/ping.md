---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: ping
---

# ping

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.ping(function (err, response) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.pingPromise()
  .then(response => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.ping(new ResponseListener<String>() {
  @Override
  public void onSuccess(String response) {
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
  $ping = $kuzzle->memoryStorage()->ping();
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"PONG"
```

Pings the memory storage database.

[[_Redis documentation_]](https://redis.io/commands/ping)

---

## ping([options], callback)

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

Resolves to a simple "PONG" string.
