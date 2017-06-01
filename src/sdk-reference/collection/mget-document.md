---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: mGetDocument
---

# mGetDocument

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .mGetDocument(['doc1', 'doc2'], function (error, result) {
    // callback called once the mGet operation has completed
    // => the result is a JSON object containing the raw Kuzzle response
  });

// Using promises (NodeJS only)
kuzzle
 .collection('collection', 'index')
 .mGetDocument()
 .then(result => {
   // promise resolved once the mGet operation has completed
   // => the result is a JSON object containing the raw Kuzzle response
 });
```

```java
JSONArray documentIds = new JSONArray();
documentIds
    .put("doc1")
    .put("doc2");

kuzzle
  .collection("collection", "index")
  .mGetDocument(documentIds, new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject object) {
      // callback called once the mGet operation has completed
      // => the result is a JSON object containing the raw Kuzzle response
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
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $result = $dataCollection->mGetDocument(['doc1', 'doc2']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{
  "hits": [
    {"_id": "doc1", "first": "document"},
    {"_id": "doc2", "second": "document"}
  ],
  "total": 2
}
```

Get multiple documents according to the provided document IDs.

---

## mGetDocument(documentIds, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documentIds`` | JSON Object | Contains the document IDs of documents to get |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves to a `JSON object` containing the raw Kuzzle response.
