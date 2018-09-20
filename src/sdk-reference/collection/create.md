---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: create
---

# create

```js
// Optional: a mapping can be provided and will be
// applied when the collection is created
const mapping = {
  properties: {
    field1: {
      type: '<es field type>'
    },
    field2: {
      type: '<es field type>'
    }
  }
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .create(mapping, function (error, result) {
    // callback called once the create operation has completed
    // => the result is a JSON object containing the raw Kuzzle response:
    // {
    //    acknowledged: true
    // }
  });

// Using promises (NodeJS only)
kuzzle
 .collection('collection', 'index')
 .createPromise(mapping)
 .then(result => {
    // promise resolved once the create operation has completed
    // => the result is a JSON object containing the raw Kuzzle response:
    // {
    //    acknowledged: true
    // }
 });
```

```java
// Optional: a mapping can be provided and will be
// applied when the collection is created
JSONObject mapping = new JSONObject()
  .put("properties", new JSONObject()
    .put("field1", new JSONObject().put("type", "<es field type>"))
    .put("field2", new JSONObject().put("type", "<es field type>"))
  );

kuzzle
  .collection("collection", "index")
  .create(mapping, new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject object) {
      // callback called once the create operation has completed
      // => the result is a JSON object containing the raw Kuzzle response:
      // {
      //    acknowledged: true
      // }
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

// Optional: a mapping can be provided and will be
// applied when the collection is created
$mapping = [
  'properties' => [
    'field1' => [
      'type' => '<es field type>'
    ],
    'field2' => [
      'type' => '<es field type>'
    ]
  ]
];

try {
  $dataCollection->create(mapping);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{
  "status": 200,
  "error": null,
  "requestId": "<request unique identifier>",
  "controller": "collection",
  "action": "create",
  "collection": "<new collection name>",
  "index": "index",
  "volatile": null,
  "result": {
    "acknowledged": true
  }
}
```

Creates a new [collection]({{ site_base_path }}guide/essentials/persisted) in Kuzzle via the persistence engine, in the provided `index`.  

{{{since "1.3.0"}}}

You can also provide an optional data mapping that allow you to exploit the full capabilities of our
persistent data storage layer, [ElasticSearch](https://www.elastic.co/products/elasticsearch) (check here the [mapping capabilities of ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/mapping.html)).  

This method will only update the mapping if the collection already exists.

---

## create([mapping], [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``mapping`` | JSON Object | Optional data mapping |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

## Return Ralue

Returns the `Collection` object to allow chaining.

---

## Callback Response

Returns a `JSON object` containing the raw Kuzzle response.
