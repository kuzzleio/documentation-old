---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: now
---

# now

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.now(function (err, res) {
  // 'res' contains the Kuzzle timestamp (utc, in milliseconds)
});

// Using promises (NodeJS only)
kuzzle.nowPromise().then(res => {
  // 'res' contains the Kuzzle timestamp (utc, in milliseconds)
});
```

```java
kuzzle.now(new ResponseListener<Date>() {
  @Override
  public void onSuccess(Date object) {
    // 'object' contains the Kuzzle timestamp (utc, in milliseconds)
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
});
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$kuzzleTime = $kuzzle->now();

// $kuzzleTime instanceof DateTime
```

> Callback response:

```json
1447151167622
```

Retrieves the current Kuzzle time.

---

## now([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Returns an `integer` containing the current Kuzzle time, encoded as an UTC Epoch time in milliseconds.
