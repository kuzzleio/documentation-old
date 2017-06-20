---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: listIndexes
---

# listIndexes

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.listIndexes(function (err, indexes) {
  // ...
});

// Using promises (NodeJS only)
kuzzle
  .listIndexesPromise()
  .then(indexes => {
    // ...
  });
```

```java
kuzzle.listIndexes(new ResponseListener<String[]>() {
  @Override
  public void onSuccess(String[] result) {
    // ...
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
$indexes = $kuzzle->listIndexes();
```

> Callback response:

```json
[ "index", "another index", "..."]
```

Retrieves the list of indexes stored in Kuzzle.

---

## listIndexes([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

The response is an `array` of index names.
