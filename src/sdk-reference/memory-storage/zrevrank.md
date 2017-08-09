---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zrevrank
---

# zrevrank

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zrevrank('key', 'foo', function (err, position) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zrevrankPromise('key', 'foo')
  .then(position => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.zrevrank("key", "member", new ResponseListener<Long>() {
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
  $position = $kuzzle->memoryStorage()->zrevrank('key', 'foo');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
0
```

Returns the position of an element in a sorted set, with scores in descending order. The index returned is 0-based (the lowest score member has an index of 0).

[[_Redis documentation_]](https://redis.io/commands/zrevrank)

---

## zrevrank(key, member, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `member` | string | Member of the sorted set |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to an integer containing the member's position in the sorted set.
