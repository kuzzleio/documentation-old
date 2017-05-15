---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getMapping
---

## getMapping

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .getMapping(function (error, result) {
    // result is a CollectionMapping object
  });

// Using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .getMappingPromise()
  .then(result => {
    // result is a CollectionMapping object
  });
```

```java
kuzzle
  .collection("collection", "index")
  .getMapping(new ResponseListener<CollectionMapping>() {
    @Override
    public void onSuccess(CollectionMapping object) {
      // result is a CollectionMapping object
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
use \Kuzzle\DataMapping;

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $mapping = $dataCollection->getMapping();

  // $mapping instanceof DataMapping
}
catch (ErrorException $e) {

}
```

Retrieves the current mapping of this collection as a [CollectionMapping](/sdk-reference/collection-mapping/) object.

---

### getMapping([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

### Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

### Callback response

Resolves to a [CollectionMapping](/sdk-reference/collection-mapping/) object.
