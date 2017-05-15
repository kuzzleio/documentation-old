---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: listCollections
---

# listCollections

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.listCollections('index', {type: 'stored', from: 0, size: 42}, function (err, collections) {
  // ...
});

// Using promises (NodeJS only)
kuzzle
  .listCollectionsPromise('index', {type: 'stored'})
  .then(collections => {
    // ...
  });
```

```java
kuzzle.listCollections("index", new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject object) {
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
$collections = $kuzzle->listCollections('index', [
  'type' => 'stored',
  'from' => 0,
  'size' => 42
]);
```

> Callback response:

```json
[
  {"name": "realtime_1", "type": "realtime"},
  {"name": "realtime_2", "type": "realtime"},
  {"name": "realtime_...", "type": "realtime"},
  {"name": "realtime_n", "type": "realtime"},
  {"name": "stored_1", "type": "stored"},
  {"name": "stored_2", "type": "stored"},
  {"name": "stored_...", "type": "stored"},
  {"name": "stored_n", "type": "stored"}
]
```

Retrieves the list of known data collections contained in a specified index.

---

## listCollections([index], [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``index`` | string | Index containing the collections to be listed |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``from`` | integer | Determines the starting point of the pagination. By default, start at the beggining | ``0`` |
| ``size`` | integer | Determines the size of the returned result set. By default, no limit is applied | ``undefined`` |
| ``type`` | string | Get either ``stored`` collections or ``realtime`` ones. By default, list ``all`` collections | ``all`` |


If no `index` argument is provided, the `defaultIndex` property is used. If no default index is found, this method throws an error.

---

## Callback response

Resolves to a `JSON object` containing the list of stored and/or realtime collections on the provided index.
