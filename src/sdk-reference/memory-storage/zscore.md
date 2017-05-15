---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zscore
---

# zscore

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zscore('key', 'bar', function (err, score) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zscorePromise('key', 'bar')
  .then(score => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zscore("key", "bar", new ResponseListener<Double>() {
  @Override
  public void onSuccess(double score) {
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
  $score = $kuzzle->memoryStorage()->zscore('key', 'bar');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
1
```

Returns the score of a member in a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zscore)

---

## zscore(key, member, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member` | string | Sorted set member |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to a floating point number containing the searched member's score.
