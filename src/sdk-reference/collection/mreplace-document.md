---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: mReplaceDocument
---

# mReplaceDocument

```js
var
  Document = require('./src/Document'),
  firstDocument = new Document(collection, 'doc1', {title: 'foo', content: 'bar'}),
  secondDocument = new Document(collection, 'doc2', {title: 'foo', content: 'bar'});

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .mReplaceDocument([firstDocument, secondDocument], function (error, result) {
    // callback called once the mReplace operation has completed
    // => the result is a JSON object containing the raw Kuzzle response
  });

// Using promises (NodeJS only)
kuzzle
 .collection('collection', 'index')
 .mReplaceDocument([firstDocument, secondDocument])
 .then(result => {
   // promise resolved once the mReplace operation has completed
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
  .mReplaceDocument(documents, new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject object) {
      // callback called once the mReplace operation has completed
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
  $result = $dataCollection->mReplaceDocument([$firstDocument, $secondDocument]);
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

Replace the provided [Documents]({{ site_base_path }}sdk-reference/document/).

---

## mReplaceDocument(documents, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documents`` | Document[] | Array of [Document]({{ site_base_path }}sdk-reference/document/) to replace |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

## Return Value

Returns the `Collection` object to allow chaining.

---

## Callback Response

Returns a `JSON object` containing the raw Kuzzle response.
Can return a 206 partial error in cases where documents could not be replaced. 
