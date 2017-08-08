---
layout: side-code.html
words:  357
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: mCreateDocument
---

# mCreateDocument

```js
var
  Document = require('./src/Document'),
  firstDocument = new Document(collection, 'doc1', {title: 'foo', content: 'bar'}),
  secondDocument = new Document(collection, 'doc2', {title: 'foo', content: 'bar'});

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .mCreateDocument([firstDocument, secondDocument], function (error, result) {
    // callback called once the mCreate operation has completed
    // => the result is a JSON object containing the raw Kuzzle response
  });

// Using promises (NodeJS only)
kuzzle
 .collection('collection', 'index')
 .mCreateDocumentPromise([firstDocument, secondDocument])
 .then(result => {
   // promise resolved once the mCreate operation has completed
   // => the result is a JSON object containing the raw Kuzzle response
 });
```

```java
Document firstDocument = new Document(collection, "doc1");
firstDocument.setContent("title", "foo");
firstDocument.setContent("content", "bar");

Document secondDocument = new Document(collection, "doc2");
secondDocument.setContent("title", "foo");
secondDocument.setContent("content", "bar");

Document[] documents = new Document[]{firstDocument, secondDocument};

kuzzle
  .collection("collection", "index")
  .mCreateDocument(documents, new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject object) {
      // callback called once the mCreate operation has completed
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
use \Kuzzle\Document;

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

$firstDocument = new Document($dataCollection, 'doc1', ['title' => 'foo', 'content' => 'bar']);
$secondDocument = new Document($dataCollection, 'doc2', ['title' => 'foo', 'content' => 'bar']);

try {
  $result = $dataCollection->mCreateDocument([$firstDocument, $secondDocument]);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{
  "hits": [
    {"first": "document"},
    {"second": "document"}
  ],
  "total": 2
}
```

Create the provided [Documents]({{ site_base_path }}sdk-reference/document/).

---

## mCreateDocument(documents, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documents`` | Document[] | Array of [Document]({{ site_base_path }}sdk-reference/document/) to create |
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
Can return a 206 partial error in case some documents could not be created.