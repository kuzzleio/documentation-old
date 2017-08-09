---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: fetchDocument
---

# fetchDocument

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .fetchDocument('documentId', function (error, result) {
    // result is a Document object
  });

// Using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .fetchDocumentPromise('documentId')
  .then(result => {
    // result is a Document object
  });
```

```java
kuzzle
  .collection("collection", "index")
  .fetchDocument("documentId", new ResponseListener<Document>() {
    @Override
    public void onSuccess(Document object) {
      // result is a Document object
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
use \Kuzzle\Document;

$documentId = 'foobar';

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $document = $dataCollection->fetchDocument($documentId);

  // $document instanceof Document
}
catch (ErrorException $e) {

}
```

Retrieves a single stored document using its unique document ID, and returns it as a [Document]({{ site_base_path }}sdk-reference/document/) object.

---

## fetchDocument(documentId, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documentId`` | string | Unique document identifier |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves to a [Document]({{ site_base_path }}sdk-reference/document/) object.
