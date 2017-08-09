---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: bitpos
---

# bitpos

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.bitpos('key', 0, function (err, position) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.bitpos('key', 0)
  .then(position => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.bitpos("key", 0, new ResponseListener<Long>() {
  @Override
  public void onSuccess(int position) {
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
  $position = $kuzzle->memoryStorage()->bitpos('key', 0);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
0
```


Returns the position of the first bit set to 1 or 0 in a string, or in a substring.

[[_Redis documentation_]](https://redis.io/commands/bitpos)

---

## bitpos(key, bit, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `bit` | int | Bit to search.<br/>Allowed values: `0`, `1` |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `end` | int | Ending offset | `-1` |
| `queuable` | boolean | Mark this request as (not) queuable | `true` |
| `start` | int | Starting offset | `0` |

---

## Callback response

Resolves to an integer containing the first position of the searched bit in the string value
