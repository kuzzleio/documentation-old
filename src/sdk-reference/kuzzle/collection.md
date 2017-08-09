---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: collection
---

# collection

```js
var collection = kuzzle.collection('collection', 'index');

// or using a default index:
var
  kuzzle = new Kuzzle('localhost', {defaultIndex: 'index'});

collection = kuzzle.collection('collection');
```

```java
Collection collection = kuzzle.collection("collection", "index");

// or using a default index:
kuzzle.setDefaultIndex("index");
Collection collection = kuzzle.collection("collection");
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

// or using a default index:
$kuzzle = new Kuzzle('localhost', [
  'defaultIndex' => 'some index'
]);
$dataCollection = $kuzzle->collection('collection', 'index');
```

Instantiates a new [Collection]({{ site_base_path }}sdk-reference/collection) object.

---

## collection(collection, [index])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``collection`` | string | The name of the data collection you want to manipulate |
| ``index`` | string | The name of the index containing the data collection |

If no ``index`` is provided, the factory will take the default index set in the main Kuzzle instance. If no default index has been set, an error is thrown.

The ``index`` argument takes precedence over the default index.

---

## Return value

Returns a [Collection]({{ site_base_path }}sdk-reference/collection) object.
