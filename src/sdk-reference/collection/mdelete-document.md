---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: mDeleteDocument
---

# mDeleteDocument

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .mDeleteDocument(['doc1', 'doc2'], function (error, result) {
    // callback called once the mDelete operation has completed
    // => the result is a JSON object containing the raw Kuzzle response
  });

// Using promises (NodeJS only)
kuzzle
 .collection('collection', 'index')
 .mDeleteDocument()
 .then(result => {
   // promise resolved once the mDelete operation has completed
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
  .mDeleteDocument(documentIds, new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject object) {
      // callback called once the mDelete operation has completed
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
  $result = $dataCollection->mDeleteDocument(['doc1', 'doc2']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
["doc1", "doc2"]
```

Delete multiple documents according to the provided document IDs.

---

## mDeleteDocument(documentIds, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documentIds`` | JSON Object | Contains the document IDs of documents to delete |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns the `Collection` object to allow chaining.

---

## Callback response

Resolves to a `JSON object` containing the raw Kuzzle response.
Can return a 206 partial error in case some documents could not be deleted.
