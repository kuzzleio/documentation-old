# KuzzleDataCollection

In Kuzzle, you manipulate documents and subscriptions, both related to data collections.

A data collection is a set of data managed by Kuzzle. It acts like a data table for persistent documents, or like a room for pub/sub messages.


## Constructors


```js
var dataCollection = new KuzzleDataCollection(kuzzle, "my-collection", "my-index")
```

```java
  KuzzleDataCollection myCollection = new KuzzleDataCollection(kuzzle, "my-collection", "my-index");
```

```objective_c
  KuzzleDataCollection* myCollection = [[KuzzleDataCollection alloc] initWithKuzzle: kuzzle collection: @"my-collection" index: @"my-index" ];
```

```swift
  let myCollection = KuzzleDataCollection(kuzzle: kuzzle, collection: "my-collection", index: "my-index")
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\DataCollection;

$kuzzle = new Kuzzle('localhost');
$dataCollection = new DataCollection($kuzzle, 'my-collection', 'my-index');
```

### KuzzleDataCollection(kuzzle, collection, index)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``kuzzle`` | object | Kuzzle object |
| ``collection`` | string | The name of the data collection you want to manipulate |
| ``index`` | string | Name of the index containing the data collection |

**Note:** It's recommanded to instanciate a KuzzleDataCollection object by calling [Kuzzle.dataCollectionFactory](#datacollectionfactory) rather than using the constructor directly

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``kuzzle`` | object | linked kuzzle instance | get |
| ``index`` | object | Name of the index containing the data collection | get |
| ``collection`` | string | The name of the data collection handled by this instance | get |
| ``headers`` | object | Headers for all sent documents. | get/set |


**Note:** the ``headers`` property is inherited from the main ``Kuzzle`` object and can be overrided

## count

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .count({}, function (err, res) {
    // ...
  });

// Using promises (NodeJS only)
kuzzle
 .dataCollectionFactory('collection', 'index')
 .countPromise({})
 .then(res => {
   // ...
 });
```

```java
JSONObject filters = new JSONObject();

kuzzle
  .dataCollectionFactory("collection", "index")
  .count(filters, new KuzzleResponseListener<Integer>() {
    @Override
    public void onSuccess(Integer object) {
      // Handle success
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];
NSDictionary* filter = @{};
[myCollection countWithFilters: filter error: &error callback:^(NSNumber * amount, NSError * error) {
  if(error) {
    // error occured
  }
  // everything went fine
}];
if(error) {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let filter = ["":""]
do {
  let myCollection = try kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")
  try myCollection.count(filters: filter, callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is integer
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use \Kuzzle\Kuzzle;

$filters = [];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $count = $dataCollection->count($filters);
}
catch (ErrorException $e) {
  // error occured
}
```

> Callback response:

```json
12
```

<aside class="notice">There is a small delay between documents creation and their existence in our search layer, usually a couple of seconds. That means that a document that was just been created won't be returned by this function</aside>

Returns the number of documents matching the provided set of filters.

### count(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | Filters in [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/1.7/query-dsl.html) format |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |


### Callback response

Resolves to the matched documents count as a ``integer``.

## create

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .create(function (error, result) {
    // callback called once the create operation has completed
    // => the result is a JSON object containing the raw Kuzzle response
  });

// Using promises (NodeJS only)
kuzzle
 .dataCollectionFactory('collection', 'index')
 .createPromise()
 .then(result => {
   // promise resolved once the create operation has completed
   // => the result is a JSON object containing the raw Kuzzle response
 });
```

```java
kuzzle
  .dataCollectionFactory("collection", "index")
  .create(new KuzzleResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject object) {
      // callback called once the create operation has completed
      // => the result is a JSON object containing the raw Kuzzle response
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  [myCollection createAndReturnError: &error callback:^(NSDictionary * collections, NSError * error) {
    if(error) {
      // error occured
    }
    // everything went fine
  }];

  if(error) {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")

do {
  try myCollection.create(callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleDataCollection object
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $result = $dataCollection->create();
}
catch (ErrorException $e) {
  // error occured
}
```

> Callback response:

```json
{
  "status": 200,
  "error": null,
  "requestId": "cf1fc8b4-fd87-46c3-b0a2-3d9d2fb7d401",
  "controller": "write",
  "action": "createCollection",
  "collection": "newly created collection",
  "index": "index",
  "metadata": {},
  "state": "done",
  "scope": null,
  "result": {}
}
```

Create a new empty data collection, with no associated mapping.

### create([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `KuzzleDataCollection` object to allow chaining.

### Callback response

Resolves to a `JSON object` containing the raw Kuzzle response.

## createDocument

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .createDocument('foobar', {title: 'foo', content: 'bar'}, {updateIfExist: true}, function (err, res) {
    // callback called once the create action has been completed
    // => the result is a KuzzleDocument object
  });

// Using promises (NodeJS only)
kuzzle
 .dataCollectionFactory('collection', 'index')
 .createDocumentPromise('foobar', {title: 'foo', content: 'bar'}, {updateIfExist: true})
 .then(res => {
   // promise resolved once the create action has been completed
   // => the result is a KuzzleDocument object
 });
```

```java
KuzzleDocument myDocument = new KuzzleDocument(collection);
myDocument.setContent("title", "foo");
myDocument.setContent("content", "bar");

kuzzle
  .dataCollectionFactory("collection", "index")
  .createDocument(myDocument, new KuzzleResponseListener<KuzzleDocument>() {
    @Override
    public void onSuccess(KuzzleDocument object) {
      // callback called once the create action has been completed
      // => the result is a KuzzleDocument object
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });
```

```objective_c
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];
KuzzleOptions* options = [[KuzzleOptions alloc] init];
options.updateIfExists = YES;

KuzzleDocument* document = [[KuzzleDocument alloc] initWithCollection: myCollection];
document.content = @{
  @"foo": @"title",
  @"bar": @"content"
};

if(!error) {
    [myCollection createDocumentWithDocument: document options: options error:&error callback:^(KuzzleDocument * document, NSError * error) {
        if(error) {
            // error occured
        }
        // everything went fine
    }];

    if(error) {
        // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
    }
} else {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")
do {
  let options = KuzzleOptions()
  options.setUpdateIfExists(true)
  let document = KuzzleDocument(collection: myCollection)
  document.content = [
    "title": "foo",
    "content": "bar"
  ]
  try myCollection.createDocument(document: document, options: options, callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleDocument
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
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
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $document = $dataCollection->createDocument($documentContent, $documentId);

  // $document instanceof Document
}
catch (ErrorException $e) {
  // error occured
}
```

Create a new document in Kuzzle.

### createDocument(KuzzleDocument, [options], [callback])

### createDocument([id], content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``KuzzleDocument`` | object | KuzzleDocument object |
| ``id`` | string | Optional document identifier |
| ``content`` | JSON object | Content of the document to create |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``metadata`` | JSON object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the peristence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |
| ``updateIfExist`` | boolean | If the same document already exists: throw an error if sets to ``false``. Update the existing document otherwise | ``false`` |

### Return value

Returns the `KuzzleDataCollection` object to allow chaining.

### Callback response

Resolves to a `KuzzleDocument` object containing the newly created document.

## dataMappingFactory

```js
var dataMapping = kuzzle
  .dataCollectionFactory('collection', 'index')
  .dataMappingFactory({someField: {type: 'string', index: 'analyzed'}})
  .apply();
```

```java
KuzzleDataMapping dataMapping = kuzzle
  .dataCollectionFactory("collection", "index")
  .dataMappingFactory(new JSONObject().put("someFiled", new JSONObject().put("type", "string").put("index", "analyzed"))
  .apply();
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  [[myCollection dataMappingFactoryWithMapping: @{@"someField": @{@"type": @"string", @"index": @"analyzed"}}] applyAndReturnError: &error];

  if(error) {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")
myCollection.dataMappingFactory(withMapping: ["someField": ["type": "string", "index": "analyzed"]])
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\DataMapping;

$mapping = [
  'someField' => [
    'type' => 'string',
    'index' => 'analyzed'
  ]
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $dataMapping = $dataCollection->dataMappingFactory($mapping);

  // $dataMapping instanceof DataMapping
  $dataMapping->apply();
}
catch (ErrorException $e) {
  // error occured
}
```

Creates a new `KuzzleDataMapping` object, using its constructor.

### dataMappingFactory([mapping])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``mapping`` | JSON Object | Optional mapping |

### Return value

Returns the newly created `KuzzleDataMapping` object.

## delete

<aside class="warning">
Since the 2.0 version, ElasticSearch <a href="https://www.elastic.co/guide/en/elasticsearch/reference/2.4/breaking_20_mapping_changes.html#_types_may_no_longer_be_deleted">removed the ability to delete a Type</a>, which is used internally by Kuzzle to store its collections.<br>
<br>
As such, it is not possible to delete a collection from Kuzzle either. You can still delete all the documents that belong to a collection but if you need to delete the collection mapping, you will need to use a new index.
</aside>

## deleteDocument

```js
// Deleting one document using callbacks (NodeJS or Web Browser)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .deleteDocument('document unique ID', function (err, res) {
    // callback called once the delete action has been completed
  });

// Deleting one document using promises (NodeJS)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .deleteDocumentPromise('document unique ID')
  .then(res => {
    // promises resolved once the delete action has been completed
  });

// Deleting multiple documents using callbacks (NodeJS or Web Browser)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .deleteDocument({filter: {equals: {title: 'foo'}}}, function (err, res) {
    // callback called once the delete with query has been completed
  });

// Deleting multiple documents using promises (NodeJS)
 kuzzle
 .dataCollectionFactory('collection', 'index')
 .deleteDocumentPromise({filter: {equals: {title: 'foo'}}})
 .then(res => {
   // promise resolved once the delete by query has been completed
 });
```

```java
// Deleting one document
kuzzle
  .dataCollectionFactory("collection", "index")
  .deleteDocument("document unique ID", new KuzzleResponseListener<String>() {
    @Override
    public void onSuccess(String object) {
      // The resulting string contains the deleted document ID
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });

// Deleting multiple documents
JSONObject equalsFilter = new JSONObject()
  .put("filter", new JSONObject()
  .put("equals",
    new JSONObject().put("title", "foo")
  ));

kuzzle
  .dataCollectionFactory("collection", "index")
  .deleteDocument(equalsFilter, new KuzzleResponseListener<String[]>() {
    @Override
    public void onSuccess(String[] object) {
      // The resulting object contains the list of deleted document IDs
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });
```

```objective_c
// Deleting one document
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  [myCollection deleteDocumentWithDocumentId: @"document unique ID" error: &error callback:^(NSArray * deletedItems, NSError * error) {
    if(error) {
      // error occured
    }
    // everything went fine
  }];

  if(error) {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}

// Deleting multiple documents
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  [myCollection deleteDocumentWithFilters: @{@"filter": @{@"equals": @{@"title": @"foo"}} error: &error callback:^(NSArray * deletedItems, NSError * error) {
    if(error) {
      // error occured
    }
    // everything went fine
  }];

  if(error) {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
// Deleting one document
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")
do {
  try myCollection.deleteDocument(documentId: "document unique ID", callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is array with deleted item
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}

// Deleting multiple documents
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")
do {
  try myCollection.deleteDocument(filters: ["filter": ["equals": ["title": "foo"]]], callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is array with deleted item
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

// Deleting one document
try {
  $result = $dataCollection->deleteDocument('documentId');
}
catch (ErrorException $e) {
  // error occured
}

// Deleting multiple documents
$filters = [
  'filter' => [
    'equals' => ['field' => 'value']
  ]
];

try {
  $result = $dataCollection->deleteDocument($filters);
}
catch (ErrorException $e) {
  // error occured
}
```

> Callback response:

```json
[ "AVCoeBkimsySTKTfa8AX" ]
```

<aside class="notice">
There is a small delay between documents creation and their existence in our search layer, usually a couple of seconds. That means that a document that was just been created won't be deleted by the filtered version of this function
</aside>

Delete either a stored document, or all stored documents matching search filters.

### deleteDocument(documentId, [options], [callback])

### deleteDocument(filters, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documentId`` | string | Unique document identifier |
| ``filters`` | JSON object | Filters in [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/1.7/query-dsl.html) format |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``metadata`` | JSON object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the peristence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |


### Return value

Returns the `KuzzleDataCollection` object to allow chaining.

### Callback response

Resolves to an `array` containing the deleted document IDs.

## documentFactory

```js
var document = kuzzle
  .dataCollectionFactory('collection', 'index')
  .documentFactory('id', {some: 'content'})
  .save();
```

```java
KuzzleDocument document = kuzzle
  .dataCollectionFactory("collection", "index")
  .documentFactory("id", new JSONObject().put("some", "content"))
  .save();
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  KuzzleDocument* document = [myCollection documentFactoryWithId: @"id" content: @{@"some": @"content"}];
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")
do {
  try myCollection.documentFactory(id: "id", content: ["some": "content"])
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
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
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');
$document = $dataCollection->documentFactory($documentId, $documentContent);

// $document instanceof Document

try {
  $document->save();
}
catch (ErrorException $e) {
  // error occured
}
```

Creates a new `KuzzleDocument` object, using its constructor.

### documentFactory([id], [content])

| Arguments | Type | Description |
|-----------|------|-------------|
| ``id`` | string | Optional document unique ID |
| ``content`` | JSON object | Optional document content |

### Return value

Returns the newly created `KuzzleDocument` object.

## fetchDocument

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .fetchDocument('documentId', function (error, result) {
    // result is a KuzzleDocument object
  });

// Using promises (NodeJS)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .fetchDocumentPromise('documentId')
  .then(result => {
    // result is a KuzzleDocument object
  });
```

```java
kuzzle
  .dataCollectionFactory("collection", "index")
  .fetchDocument("documentId", new KuzzleResponseListener<KuzzleDocument>() {
    @Override
    public void onSuccess(KuzzleDocument object) {
      // result is a KuzzleDocument object
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  [myCollection fetchDocumentWithDocumentId: "documentId" error: &error callback:^(KuzzleDocument * document, NSError * error) {
    if(error) {
      // error occured
    }
    // everything went fine
  }];

  if(error) {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")

do {
  try myCollection.fetchDocument(documentId: "documentId", callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleDocument
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Document;

$documentId = 'foobar';

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $document = $dataCollection->fetchDocument($documentId);

  // $document instanceof Document
}
catch (ErrorException $e) {
  // error occured
}
```

Retrieves a single stored document using its unique document ID.

### fetchDocument(documentId, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documentId`` | string | Unique document identifier |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |


### Callback response

Resolves to a `KuzzleDocument` object.

## fetchAllDocuments

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .fetchAllDocuments(function (error, result) {
    // result is an object containing the total number of documents
    // and an array of KuzzleDocument objects
  });

// Using promises (NodeJS)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .fetchAllDocumentsPromise()
  .then(result => {
    // result is an object containing the total number of documents
    // and an array of KuzzleDocument objects
  });
```

```java
kuzzle
  .dataCollectionFactory("collection", "index")
  .fetchAllDocuments(new KuzzleResponseListener<KuzzleDocumentList>() {
    @Override
    public void onSuccess(KuzzleDocumentList object) {
      // result is an object containing the total number of documents
      // and an array of KuzzleDocument objects
      for (KuzzleDocument doc : result.getDocuments()) {
        // Get documents
      }

      result.getTotal(); // return total of documents returned
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  [myCollection fetchAllDocumentsAndReturnError: &error callback:^(KuzzleDocumentList * documentList, NSError * error) {
    if(error) {
      // error occured
    }
    // everything went fine
  }];

  if(error) {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")

do {
  try myCollection.fetchAllDocuments(callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleDocumentList object
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Document;
use \Kuzzle\Util\SearchResult;

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $result = $dataCollection->fetchAllDocuments();

  // $result instanceof SearchResult

  foreach($result->getDocuments() as $document) {
    // $result instanceof Document
  }
}
catch (ErrorException $e) {
  // error occured
}
```

> Callback response:

```json
{ "total": 3,
  "documents": [<KuzzleDocument>, <KuzzleDocument>, <KuzzleDocument>]
}
```

Retrieves all documents stored in this data collection.

### fetchAllDocuments([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | integer | Upper bounds for paginated results. | ``0`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``size`` | integer | Lower bounds for paginated results. | ``10`` |

### Callback response

Resolves to an object containing:

- the total number of retrieved documents
- a `array` of `KuzzleDocument` objects


## getMapping

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .getMapping(function (error, result) {
    // result is a KuzzleDataMapping object
  });

// Using promises (NodeJS)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .getMappingPromise()
  .then(result => {
    // result is a KuzzleDataMapping object
  });
```

```java
kuzzle
  .dataCollectionFactory("collection", "index")
  .getMapping(new KuzzleResponseListener<KuzzleDataMapping>() {
    @Override
    public void onSuccess(KuzzleDataMapping object) {
      // result is a KuzzleDataMapping object
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
    [myCollection getMappingAndReturnError: &error callback:^(KuzzleDataMapping * mapping, NSError * error) {
    if(error) {
      // error occured
    }
    // everything went fine
  }];

  if(error) {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")
do {
  try myCollection.getMapping(callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleDataMapping object
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\DataMapping;

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $mapping = $dataCollection->getMapping();

  // $mapping instanceof DataMapping
}
catch (ErrorException $e) {
  // error occured
}
```

Retrieves the current mapping of this collection.

### getMapping([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

Resolves to a `KuzzleDataMapping` object.

## publishMessage

```js
kuzzle
  .dataCollectionFactory('collection', 'index')
  .publishMessage({foo: 'bar', baz: 'qux'});
```

```java
JSONObject message = new JSONObject().put("some", "content");
JSONObject metadata = new JSONObject().put("metadata", "are volatile information");
KuzzleOptions opts = new KuzzleOptions().setMetadata(metadata);

kuzzle
  .dataCollectionFactory("collection", "index")
  .publish(message, opts);
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  KuzzleOptions* options = [[KuzzleOptions alloc] init];
  options.metadata = @{@"metadata": @"is volatile information"};
  [myCollection publishMessageWithContent: @{@"foo": @"bar", @"baz": @"qux"} options: options error: &error];
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  // NSError representation for KuzzleError.ContentEmpty, when content of passed document is empty
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")
do {
  let options = KuzzleOptions()
  options.setMetadata(["metadata": "is volatile information"])
  try myCollection.publishMessage(content: ["foo": "bar", "baz": "qux"], options: options)
} catch {
  // KuzzleError.ContentEmpty, when content of passed document is empty
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use \Kuzzle\Kuzzle;

$message = [
  'field' => 'value'
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $result = $dataCollection->publishMessage($message);
}
catch (ErrorException $e) {
  // error occured
}
```

Publish a realtime message

### publishMessage(KuzzleDocument, [options], [callback])

### publishMessage(content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``KuzzleDocument`` | object | KuzzleDocument object |
| ``content`` | JSON Object | Content of the document to publish |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``metadata`` | JSON Object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `KuzzleDataCollection` object to allow chaining.

### Callback response

Resolves to a raw Kuzzle response in JSON format.

## replaceDocument

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .replaceDocument('documentId', {title: 'foo', content: 'bar'}, function (error, result) {
    // result is a KuzzleDocument object
  });

// Using promises (NodeJS)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .replaceDocumentPromise('documentId', {title: 'foo', content: 'bar'})
  .then(result => {
    // result is a KuzzleDocument object
  });
```

```java
JSONObject newContent = new JSONObject("new", "document content");

kuzzle
  .dataCollectionFactory("collection", "index")
  .replaceDocument("documentId", newContent, new KuzzleResponseListener<KuzzleDocument>() {
    @Override
    public void onSuccess(KuzzleDocument document) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  [myCollection replaceDocumentWithDocumentId: @"documentId" content: @{@"new": @"document content"} error: &error callback: ^(KuzzleDocument * document, NSError * error) {
    if(error) {
      // error occured
    }
    // everything went fine
  }];

  if(error) {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")

do {
  try myCollection.replaceDocument(documentId: "documentId", content: ["new": "document content"], callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleDocument object
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}

```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Document;

$documentId = 'foobar';
$documentContent = [
  'field' => 'value'
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $document = $dataCollection->replaceDocument($documentId, $documentContent);

  // $document instanceof Document
}
catch (ErrorException $e) {
  // error occured
}
```

Replace an existing document with a new one.

### replaceDocument(documentId, content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documentId`` | string | Unique document identifier |
| ``content`` | JSON Object | Content of the document to create |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``metadata`` | JSON Object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the peristence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |

### Return value

Returns the `KuzzleDataCollection` object to allow chaining.

### Callback response

Resolves to an updated `KuzzleDocument` object.

## roomFactory

```js
var room = kuzzle
  .dataCollectionFactory('collection', 'index')
  .roomFactory()
  .renew({in: {field: ['some', 'new', 'filter']}}, function (err, res) {
    // handle notifications
  });
```

```java
JSONObject filters = new JSONObject()
  .put("in",
    new JSONObject("field")
      .put(new JSONArray()
        .put("some")
        .put("filter")
      )
  );

KuzzleRoom room = kuzzle.dataCollectionFactory("collection", "index")
  .roomFactory()
  .renew(filters, new KuzzleResponseListener<KuzzleNotificationResponse>() {
    @Override
      public void onSuccess(KuzzleNotificationResponse object) {
        // handle notifications
      }

      @Override
      public void onError(JSONObject error) {
        // Handle notifications error
      }
  });
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  KuzzleRoom* room = [myCollection roomFactory];
  [room renewWithFilters: @{@"in": @{@"field": @[@"some", @"new", @"filter"]}} error: &error callback:^(KuzzleNotification * notification, NSError * error) {
    if(error) {
      // error occured
    }
    // everything went fine
  }];

  if(error) {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")
let room = dataCollection.roomFactory()
do {
  try room.renew(filters: ["in": ["field": ["some", "new", "filter"]]], callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleNotification object
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

// not implemented (sdk PHP is using REST API)
```

Creates a new `KuzzleRoom` object, using its constructor.

### roomFactory([options])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | object | Subscription configuration |

### Return value

Returns the newly created `KuzzleRoom` object.

## search

```js
var filter = {
  filter: {
    and: [
      {
        in: {
          status: ['idle', 'wantToHire', 'toHire', 'riding'],
        }
      },
      {
        in:{
          type: ['cab']
        }
      },
      {
        geo_distance: {
          distance: '10km',
          pos: {
            lat: '48.8566140', lon: '2.352222'
          }
        }
      }
    ]
  },
  aggregations: {
    aggs_name: {
      terms: {
        field: "field_name"
      }
    }
  }
};

kuzzle
  .dataCollectionFactory('collection', 'index')
  .search(filter, function (err, res) {
    res.documents.forEach(document => {
      console.log(document.toString());
    });
  });

// Using promises (NodeJS only)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .searchPromise({})
  .then(res => {
    res.documents.forEach(document => {
      console.log(document.toString());
    });
  });
```

```java
JSONObject filter = new JSONObject()
  .put("filter", new JSONObject()
    .put("and", new JSONArray()
      .put(
        new JSONObject().put("in",
          new JSONObject().put("status",
            new JSONArray()
              .put("idle")
              .put("wantToHire")
              .put("toHire")
              .put("riding")
          )
        )
      )
      .put(
        new JSONObject().put("in",
          new JSONObject()
            .put("type", new JSONArray().put("cab"))
        )
      )
      .put(
        new JSONObject().put("geo_distance",
          new JSONObject()
            .put("distance", "10km")
            .put("pos",
              new JSONObject()
                .put("lat", "48.8566140")
                .put("lon", "2.352222")
            )
        )
      )
    )
  )
  .put("aggregations", new JSONObject()
    .put("aggs_name", new JSONObject()
      .put("terms", new JSONObject()
        .put("field", "field_name")
      )
    )
  );

kuzzle
  .dataCollectionFactory("collection", "index")
  .search(userFilter, new KuzzleResponseListener<KuzzleDocumentList>() {
    @Override
    public void onSuccess(KuzzleDocumentList result) {
      for (KuzzleDocument doc : result.getDocuments()) {
        // Get documents
      }

      result.getTotal(); // return total of documents returned

      result.getAggregations(): // return a JSONObject representing the aggregations response
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

NSDictionary* inStatus = @{
  @"in": @{
    @"status": @[
      @"idle", @"wantToHire", @"toHire", @"riding"
    ],
  }
};

NSDictionary* inType = @{
  @"in": @{
    @"type": @[@"cab"]
  }
};

NSDictionary* geoDistance = @{
  @"geo_distance": @{
    @"distance": @"10km",
    @"pos": @{
      @"lat": @"54.4838902",
      @"lon": @"17.01559"
    }
  }
};

NSDictionary* filter = @{
  @"filter": @{
    @"and": @[
     inStatus,
     inType,
     geoDistance
    ]
  }
};

[myCollection searchWithFilters: filter error: &error callback:^(KuzzleDocumentList* documentList, NSError* error) {
    if(error) {
        // error occured
    }
    // everything went fine
}];
if(error) {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
  let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")
  let inStatus = [
    "in": [
      "status": ["idle", "wantToHire", "toHire", "riding"],
    ]
  ]
  let inType = [
    "in":[
      "type": ["cab"]
    ]
  ]

  let geoDistance = [
    "geo_distance": [
      "distance": "10km",
      "pos": [
        "lat": "54.4838902",
        "lon": "17.01559"
        ]
    ]
  ]

  let filter = [
    "filter": [
      "and": [
        inStatus,
        inType,
        geoDistance
      ]
    ]
  ]
  do {
    try myCollection.search(filters: filter, callback: { result in
        switch result {
          case let .onError(error):
          // error occured during call, error is NSError
          break
          case let .onSuccess(success):
          // everything went fine, success is KuzzleDocumentList object
          break
        }
    })
  } catch {
    // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Document;
use \Kuzzle\Util\SearchResult;

$filters = [
  'filter' => [
    'and' => [
      [
        'in' => [
          'status' => ['idle', 'wantToHire', 'toHire', 'riding'],
        ]
      ],
      [
        'in' => [
          'type' => ['cab']
        ]
      ],
      [
        'geo_distance' => [
          'distance' => '10km',
          'pos' => [
            'lat' => '48.8566140',
            'lon' => '2.352222'
          ]
        ]
      ]
    ]
  ],
  'aggregations' => [
    'aggs_name' => [
      'terms' => [
        'field' => 'field_name'
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $searchResult = $dataCollection->search($filters);

  // $searchResult instanceof SearchResult
  $searchResult->getTotal();

  foreach($searchResult->getDocuments() as $document) {
    // $document instanceof Document
  }

  // return an array representing the aggregations response
  $searchResult->getAggregations();
}
catch (ErrorException $e) {
  // error occured
}
```

> Callback response:

```json
{ "total": 3,
  "documents": [<KuzzleDocument>, <KuzzleDocument>, <KuzzleDocument>],
  "aggregations": {
    "aggs_name": {"aggregation": "object"}
  }
}
```


<aside class="notice">
There is a small delay between documents creation and their existence in our search layer, usually a couple of seconds. That means that a document that was just been created won't be returned by this function
</aside>

Executes a search on the data collection.

### search(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON object | Filters in [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/1.7/query-dsl.html) format |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |


Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |


### Callback response

Resolves to a `JSON object` containing:

- the total number of matched documents
- an `array` of `KuzzleDocument` objects
- an `array` of `aggregations` objects if some are provided in the request (see the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/search-aggregations.html) for more details)

## setHeaders

```js
kuzzle
  .dataCollectionFactory('collection', 'index')
  .setHeaders({
    someContent: 'someValue',
    metadata: { someMetaData: ['with', 'some', 'values']}
  }, true);
```

```java
JSONObject headers = new JSONObject()
  .put("someContent", "someValue")
  .put("metadata", new JSONObject()
    .put("someMetaData", new JSONArray()
      .put("with")
      .put("some")
      .put("values")
    )
  );

kuzzle
  .dataCollectionFactory("collection", "index")
  .setHeaders(content, true);
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  NSDictionary* headers = @{
    @"someContent": @"someValue",
    @"metadata": @{
      @"someMetaData": @[
        @"with",
        @"some",
        @"values"
        ]
      }
    };
  [myCollection setHeadersWithData: headers replace: YES];
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")

let headers = [
  "someContent": "someValue",
  "metadata": [
    "someMetaData": [
     "with",
      "some",
      "values"
    ]
  ]
]

myCollection.setHeaders(content: headers, replace: true)
```

```php
<?php

use \Kuzzle\Kuzzle;

$headers = [
  'someContent' => 'someValue'
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');
$dataCollection->setHeaders($headers, true);
```

This is a helper function returning itself, allowing to easily set headers while chaining calls.

### setHeaders(content, [replace])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | New content |
| ``replace`` | boolean | true: replace the current content with the provided data, false: merge it |

**Note:** by default, the ``replace`` argument is set to ``false``

### Return value

Returns the `KuzzleDataCollection` object to allow chaining.

## subscribe

```js
kuzzle
  .dataCollectionFactory('collection', 'index')
  .subscribe({equals: {title: 'foo'}}, function (error, result) {
    // called each time a new notification on this filter is received
    // check the KuzzleRoom/Notifications section of this documentation
    // to get notification examples
  })
  .onDone(function (err, kuzzleRoomInstance) {
    // Handles the subscription result. Can be chained.
  });
```

```java
JSONObject filter = new JSONObject()
  .put("and", new JSONArray()
    .put(
      new JSONObject().put("in",
        new JSONObject().put("status",
          new JSONArray()
            .put("idle")
            .put("wantToHire")
            .put("toHire")
            .put("riding")
        )
      )
    )
    .put(
      new JSONObject().put("in",
        new JSONObject()
          .put("type", new JSONArray().put("cab"))
      )
    )
    .put(
      new JSONObject().put("geo_distance",
        new JSONObject()
          .put("distance", "10km")
          .put("pos",
            new JSONObject()
              .put("lat", "48.8566140")
              .put("lon", "2.352222")
          )
      )
    )
  );

kuzzle
  .dataCollectionFactory("collection", "index")
  .subscribe(filter, new KuzzleResponseListener<KuzzleNotificationResponse>() {
    @Override
    public void onSuccess(KuzzleNotificationResponse object) {
      // called each time a new notification on this filter is received

      // check the KuzzleRoom/Notifications section of this documentation
      // to get notification examples
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  })
  .onDone(new KuzzleResponseListener<KuzzleRoom>() {
    @Override
    public void onSuccess(KuzzleRoom response) {
      // Handle subscription success
    }

    @Override
    public void onError(JSONObject error) {
      // Handle subscription error
    }
  });
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

NSDictionary* inStatus = @{
  @"in": @{
    @"status": @[
      @"idle", @"wantToHire", @"toHire", @"riding"
    ],
  }
};

NSDictionary* inType = @{
  @"in": @{
    @"type": @[
      @"cab"
    ]
  }
};

NSDictionary* geoDistance = @{
  @"geo_distance": @{
    @"distance": @"10km",
    @"pos": @{
     @"lat": @"54.4838902",
     @"lon": @"17.01559"
    }
  }
};

NSDictionary* filter = @{
  @"filter": @{
    @"and": @[
      inStatus,
      inType,
      geoDistance
    ]
  }
};

if(!error) {
  [myCollection subscribeWithFilters: filter error: &error callback:^(KuzzleDocumentList* documentList, NSError* error) {
    if(error) {
        // error occured
    }
    // everything went fine
}];
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
  let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")
  let inStatus = [
    "in": [
      "status": ["idle", "wantToHire", "toHire", "riding"],
    ]
  ]
  let inType = [
    "in":[
      "type": ["cab"]
    ]
  ]

  let geoDistance = [
    "geo_distance": [
      "distance": "10km",
      "pos": [
        "lat": "54.4838902",
        "lon": "17.01559"
      ]
    ]
  ]

  let filter = [
    "filter": [
      "and": [
        inStatus,
        inType,
        geoDistance
      ]
    ]
  ]
  do {
    try myCollection.subscribe(filters: filter, callback: { result in
        switch result {
          case let .onError(error):
          // error occured during call, error is NSError
          break
          case let .onSuccess(success):
          // everything went fine, success is KuzzleDocumentList object
          break
        }
    })
  } catch {
    // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
```

```php
<?php

// not implemented (sdk PHP is using REST API)
```

Subscribes to this data collection with a set of filters.

<aside class="notice">
To subscribe to the entire data collection, simply provide an empty filter.
</aside>

### subscribe(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | [Filters](http://kuzzle.io/documentation/real-time-filters) |
| ``options`` | object | (Optional) Subscription configuration. Passed to the KuzzleRoom constructor. |
| ``callback`` | function | Callback to call every time a notification is received on this subscription |

### Return value

Returns an object exposing the following method:  
  ```onDone(callback)```

The `callback` argument is called when the subscription ends, either successfully or with an error.

## truncate

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .truncate(function (error, result) {
    // callback called once the truncate operation has completed
    // => the result is a JSON object containing the raw Kuzzle response
  });

// Using promises (NodeJS only)
kuzzle
 .dataCollectionFactory('collection', 'index')
 .truncatePromise()
 .then(result => {
   // promise resolved once the truncate operation has completed
   // => the result is a JSON object containing the raw Kuzzle response
 });
```

```java
kuzzle
  .dataCollectionFactory("collection", "index")
  .truncate(new KuzzleResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject object) {
      // callback called once the truncate operation has completed
      // => the result is a JSON object containing the raw Kuzzle response
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  [myCollection truncateAndReturnError: &error callback:^(NSDictionary * result, NSError * error) {
    if(error) {
      // error occured
    }
    // everything went fine
  }];

  if(error) {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")

do {
  try myCollection.truncate(callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is dictionary
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $dataCollection->truncate();
}
catch (ErrorException $e) {
  // error occured
}
```

> Callback response:

```json
{
  "status": 200,
  "error": null,
  "requestId": "8fdc0efb-6fc7-427d-a3a1-fd8cf5eabc20",
  "controller": "admin",
  "action": "truncateCollection",
  "collection": "name of the truncated collection",
  "index": "name of the index containing the truncated collection",
  "metadata": {},
  "state": "done",
  "result": { "acknowledged": true }
}
```

Truncate the data collection, removing all stored documents but keeping all associated mappings.

This method is a lot faster than removing all documents using a query.

### truncate([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `KuzzleDataCollection` object to allow chaining.

### Callback response

Resolves to a `JSON object` containing the raw Kuzzle response.

## updateDocument

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .updateDocument('documentId', {title: 'foo', content: 'bar'}, function (error, result) {
    // result is a KuzzleDocument object
  });

// Using promises (NodeJS)
kuzzle
  .dataCollectionFactory('collection', 'index')
  .updateDocumentPromise('documentId', {title: 'foo', content: 'bar'})
  .then(result => {
    // result is a KuzzleDocument object
  });
```

```java
JSONObject newTitle = new JSONObject().put("title", "a shiny new title");

kuzzle
  .dataCollectionFactory("collection", "index")
  .updateDocument("documentId", newTitle, new KuzzleResponseListener<KuzzleDocument>() {
    @Override
    public void onSuccess(KuzzleDocument result) {
      // result is an updated KuzzleDocument object
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });
```

```objective_c
NSError* error = nil;
KuzzleDataCollection* myCollection = [kuzzle dataCollectionFactoryWithCollectionName: @"collection" index: @"index" error: &error];

if(!error) {
  [myCollection updateDocumentWithDocumentId: @"documentId" content: @{@"title":@"a shiny new title"} error: &error callback:^(KuzzleDocument * document, NSError *  error) {
    if(error) {
      // error occured
    }
    // everything went fine
  }];

  if(error) {
    // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
  }
} else {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let myCollection = try! kuzzle.dataCollectionFactory(collectionName: "collection", index: "index")

do {
  try myCollection.updateDocument(documentId: "documentId", content: ["title": "a shiny new title"], callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleDocument object
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Document;

$documentId = 'foobar';
$documentContent = [
  'newField' => 'foo'
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->dataCollectionFactory('collection', 'index');

try {
  $document = $dataCollection->updateDocument($documentId, $documentContent);

  // $document instanceof Document
}
catch (ErrorException $e) {
  // error occured
}
```

Update parts of a document, by replacing some fields or adding new ones.
Note that you cannot remove fields this way: missing fields will simply be left unchanged.

### updateDocument(documentId, content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``documentId`` | string | Unique document identifier |
| ``content`` | JSON object | Content of the document to create |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``metadata`` | JSON object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the peristence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |

### Return value

Returns the `KuzzleDataCollection` object to allow chaining.

### Callback response

Resolves to an up-to-date `KuzzleDocument` object.
