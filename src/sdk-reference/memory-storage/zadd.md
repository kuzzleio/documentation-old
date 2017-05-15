---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: zadd
---

# zadd

```js
var elements = [
  {'score': 1, 'member': 'foo'},
  {'score': 2, 'member': 'bar'},
  {'score': 3, 'member': 'baz'}
];

// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.zadd('key', elements, function (err, count) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.zaddPromise('key', elements)
  .then(count => {
    // resolved once the action has completed
  });
```

```java
JSONArray elements = new JSONArray()
  .put(new JSONObject().put("score", 1).put("member", "foo"))
  .put(new JSONObject().put("score", 2).put("member", "bar"))
  .put(new JSONObject().put("score", 3).put("member", "baz"));

kuzzle.memoryStorage.zadd("key", elements new ResponseListener<Long>() {
  @Override
  public void onSuccess(int count) {
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

$elements = [
  ['score' => 1, 'member' => 'foo'],
  ['score' => 2, 'member' => 'bar'],
  ['score' => 3, 'member' => 'baz']
];

try {
  $value = $kuzzle->memoryStorage()->zadd('key', elements);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
3
```

Adds the specified elements to the sorted set stored at `key`. If the key does not exist, it is created, holding an empty sorted set. If it already exists and does not hold a sorted set, an error is returned.

Scores are expressed as floating point numbers.

If a member to insert is already in the sorted set, its score is updated and the member is reinserted at the right position in the set.

[[_Redis documentation_]](https://redis.io/commands/zadd)

---

## zadd(key, elements, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `elements` | array | List of JSON objects detailing the element to add to the sorted set.<br/>Properties: `score` (element's score, `double`), `member` (element's value, `string`) |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `ch` | boolean | Instead of returning the number of added allements, return the total number of changes performed (including updates) | `false` |
| `incr` | boolean | Instead of adding elements, increment the existing member with the provided `score` value. Only one score+element pair can be specified if this option is set | `false` |
| `nx` | boolean | Only add new elements, do not update existing ones | `false` |
| `queuable` | boolean | Mark this request as (not) queuable | ``true`` |
| `xx` | boolean | Never add new elements, update only exiting ones | `false` |


---

## Return value

Returns the `MemoryStorage` object to allow chaining.

---

## Callback response

Resolves to an integer containing the number of elements added to the sorted set.
