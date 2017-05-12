# CollectionMapping

When creating a new data collection in the persistent data storage layer, Kuzzle uses a default mapping.
It means that, by default, you won't be able to exploit the full capabilities of our persistent data storage layer (currently handled by [ElasticSearch](https://www.elastic.co/products/elasticsearch)), and your searches may suffer from below-average performances, depending on the amount of data you stored in a collection and the complexity of your database.

The CollectionMapping object allow to get the current mapping of a data collection and to modify it if needed.

<aside class="notice">
Once a field mapping has been set, it cannot be removed without reconstructing the data collection.
</aside>

## Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 CollectionMapping objects are returned by the method
 Collection.getMapping

 You may also use the Collection.collectionMapping() method:
 */
var mapping = kuzzle.collection('collection', 'index').collectionMapping();

mapping = kuzzle.collection('collection', 'index').collectionMapping(mapping);
```

```java
CollectionMapping dataMapping = new CollectionMapping(dataCollection);

JSONObject mapping = new JSONObject();
JSONObject type = new JSONObject();
type.put("type", "string");
mapping.put("foo", type);

CollectionMapping dataMapping = new CollectionMapping(dataCollection, mapping);
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
$dataCollection = $kuzzle->collection('collection', 'index');

$dataMapping = $dataCollection->collectionMapping($mapping);
// $dataMapping instanceof DataMapping
```

### CollectionMapping(Collection, [mapping])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Collection`` | JSON Object | An instantiated Collection object |
| ``mapping`` | JSON Object | Optional mapping |

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``headers`` | JSON Object | Common headers for all sent documents. | get/set |
| ``mapping`` | object | Easy-to-understand list of mappings per field | get/set |

**Note:** the ``headers`` property is inherited from the provided ``Collection`` object and can be overrided

## apply

```js
// Using callbacks (NodeJS or Web Browser)
dataMapping.apply(function (error, result) {
  // called once the mapping action has been completed
});

// Using promises (NodeJS)
dataMapping.applyPromise().then(function (error, result) {
  // resolved once the mapping action has been completed
});
```

```java
dataMapping.apply(new ResponseListener<CollectionMapping>() {
   @Override
   public void onSuccess(CollectionMapping object) {
     // called once the mapping action has been completed
   }

   @Override
   public void onError(JSONObject error) {
     // Handle error
   }
});
```

```php
<?php

use \Kuzzle\DataMapping;

// ...

/**
 * @var $dataMapping DataMapping
 */
$dataMapping->apply();
```

Applies the new mapping to the data collection.

### apply([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns this `CollectionMapping` object to allow chaining.

### Callback response

Resolves to this updated `CollectionMapping` object.

## refresh

```js
// Using callbacks (NodeJS & Web Browser)
dataMapping.refresh(function (error, result) {
  // called once the mapping has been retrieved from Kuzzle
});

// Using promises (NodeJS)
dataMapping.refreshPromise().then(result => {
  // resolved once the mapping has been retrieved from Kuzzle
});
```

```java
dataMapping.refresh(new ResponseListener<CollectionMapping>() {
   @Override
   public void onSuccess(CollectionMapping object) {
     // called once the mapping has been retrieved from Kuzzle
   }

   @Override
   public void onError(JSONObject error) {
     // Handle error
   }
});
```

```php
<?php

use \Kuzzle\DataMapping;

// ...

/**
 * @var $dataMapping DataMapping
 */
$dataMapping->refresh();
```

Instantiates a new CollectionMapping object with an up-to-date content.

### refresh([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |


### Callback response

Resolves to this updated `CollectionMapping` object.

## set

```js
dataMapping.set('field', {type: 'string', index: 'analyzed', null_value: ''});
```

```java
JSONObject mapping = new JSONObject();
mapping.put("type", "string");
mapping.put("index", "analyzed");
mapping.put("null_value", "");

dataMapping.set("field", mapping);
```

```php
<?php

use \Kuzzle\DataMapping;

// ...

$field = 'field';
$mapping = [
  'type' => 'string',
  'index' => 'analyzed',
  'null_value' => ''
];

/**
 * @var $dataMapping DataMapping
 */
$dataMapping->set($field, $mapping);
```

<aside class="notice">Changes made by this function won't be applied until you call the <code>apply</code> method</aside>

Adds or updates a field mapping.

### set(field, mapping)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``field`` | string | Name of the field from which the mapping is to be added or updated |
| ``mapping`` | JSON Object | Mapping for this field, following the [Elasticsearch Mapping format](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html)

### Return value

Returns this `CollectionMapping` object to allow chaining.

## setHeaders

```js
dataMapping.setHeaders({someContent: 'someValue'}, true);
```

```java
JSONObject headers = new JSONObject();
headers.put("someContent", "someValue");
dataMapping.setHeaders(headers, true);
```

```php
<?php

use \Kuzzle\DataMapping;

// ...

$headers = [
  'someContent' => 'someValue'
];

/**
 * @var $dataMapping DataMapping
 */
$dataMapping->setHeaders($headers);
```

This is a helper function returning itself, allowing to easily chain calls.

### setHeaders(content, [replace])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | New content |
| ``replace`` | boolean | true: replace the current content with the provided data, false: merge it |

**Note:** by default, the ``replace`` argument is set to ``false``

### Return value

Returns this `CollectionMapping` object to allow chaining.
