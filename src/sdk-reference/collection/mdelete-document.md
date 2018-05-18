---
layout: side-code.html.handlebars
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
String[] documentIds = new String[]{"doc1", "doc2"};

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

Delete multiple [Documents]({{ site_base_path }}sdk-reference/document/) according to the input IDs.

---

## mDeleteDocument(documentIds, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documentIds`` | String[] | Array of IDs of documents to delete |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

## Callback Response

Returns a `JSON object` containing the raw Kuzzle response.
Can return a 206 partial error in cases where some documents could not be deleted.
