---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: createIndex
---

# createIndex

```js
// Using callbacks (node.js or browser)
kuzzle.createIndex('myIndex', function (err, res) {
  console.log(res);     // {acknowledge: true}
});

// Using promises (node.js)
kuzzle
  .createIndexPromise('myIndex')
  .then(res => {
    console.log(res);   // {acknowledge: true}
  });
```

```java
kuzzle.createIndex("myIndex", new ResponseListener<Boolean>() {
  @Override
  public void onSuccess(JSONObject result) {
    // result var contains the creation status of myIndex.
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
}
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$result = $kuzzle->createIndex('myIndex');

// $result = [acknowledge => true]
```

Create a new empty data index, with no associated mapping.

---

## createIndex([index], [options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `index` | string | Optional index to query. If no set, defaults to [Kuzzle.defaultIndex]({{ site_base_path }}sdk-reference/kuzzle/#properties)
| `options` | JSON object | Optional parameters
| `callback`| function | Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Mark this request as (not) queuable | `true`

---

## Callback response

The response is a an object reflecting the index creation status.
