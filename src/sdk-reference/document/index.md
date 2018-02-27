---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: Document
description: Class for documents handling
show-subheader: true
subheader-title: Constructor
---

# Document

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 Document objects are returned by various Collection methods.

 You may also use the Collection.document() method:
 */
var document = kuzzle.collection('collection', 'index').document('id');

document = kuzzle
  .collection('collection', 'index')
  .document({content: 'some content'});

document = kuzzle
  .collection('collection', 'index')
  .document('id', {content: 'some content'});
```

```java
Document document = new Document(collection);

Document document = new Document(collection, "id");

JSONObject content = new JSONObject();
content.put("content", "some content");
Document document = new Document(collection, content);

Document document = new Document(collection, "id", content);
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Document;

$documentId = 'foobar';
$documentContent = [
  'title' => 'foo',
  'content' => 'bar'
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

// You can use the factory embeded in DataCollection object
$document = $dataCollection->document($documentId, $documentContent);

// or directly with public constructor
$document = new Document($dataCollection, $documentId, $documentContent);
```

Kuzzle Backend handles two types of documents: realtime messages and stored documents. Document is the object representation of one of these document types.

---

## Document(Collection, [documentId], [content])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Collection`` | object | An instantiated Collection object |
| ``content`` | JSON Object | Initializes this document with the provided content |
| ``documentId`` | string | ID of an existing document. |

**Note:**  this constructor won't make any call to Kuzzle Backend. When providing only a document ID, the `refresh` method should be called to retrieve the corresponding document content.

---

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``collection`` | string | The data collection associated to this document | get |
| ``content`` | JSON Object | The content of the document | get/set |
| ``id`` | string | Unique document identifier | get/set |
| ``meta`` | JSON Object | Document [metadata]({{ site_base_path }}guide/essentials/document-metadata/) | get |
| ``version`` | integer | Current document version | get |

**Notes:**  

* setting a new value to the ``content`` property is equivalent to calling ``setContent(data, false)``
* setting a new value to the ``id`` property will force this value for this document
