---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: Collection
description: Data collection methods
show-subheader: true
subheader-title: Constructor
---

# Collection

```js
let dataCollection = new Collection(kuzzle, "my-collection", "my-index")
```

```java
  Collection myCollection = new Collection(kuzzle, "my-collection", "my-index");
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Collection;

$kuzzle = new Kuzzle('localhost');
$dataCollection = new Collection($kuzzle, 'my-collection', 'my-index');
```

In Kuzzle, you manipulate documents and subscriptions, both related to data collections.

A data collection is a set of data managed by Kuzzle. It acts like a data table for persistent documents, or like a room for pub/sub messages.

---

## Collection(kuzzle, collection, index)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``kuzzle`` | object | Kuzzle object |
| ``collection`` | string | The name of the data collection you want to manipulate |
| ``index`` | string | Name of the index containing the data collection |

**Note:** It's recommended to instantiate a Collection object by calling [Kuzzle.collection]({{ site_base_path }}sdk-reference/kuzzle/collection) rather than using the constructor directly

---

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``kuzzle`` | object | linked kuzzle instance | get |
| ``index`` | object | Name of the index containing the data collection | get |
| ``collection`` | string | The name of the data collection handled by this instance | get |
| ``headers`` | object | Headers for all sent documents. | get/set |


**Note:** the ``headers`` property is inherited from the main ``Kuzzle`` object and can be overrided
