---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: updateSpecifications
---

# updateSpecifications

```js
var specifications = {
  strict: 'true',
  fields: {
    foo: {
      mandatory: true,
      type: 'string',
      defaultValue: 'bar'
    }
  }
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .updateSpecifications(specifications, function (err, res) {
    // result is a JSON object
  });

// Using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .updateSpecificationsPromise(specifications)
  .then(res => {
    // result is a JSON object
  });
```

```java
JSONObject fooField = new JSONObject()
    .put("mandatory", "true")
    .put("type", "string")
    .put("defaultValue", "bar");

JSONObject fields = new JSONObject()
    .put("foo", fooField);

JSONObject specifications = new JSONObject()
    .put("strict", "true")
    .put("fields", fields);

kuzzle
  .collection("collection", "index")
  .updateSpecifications(specifications, new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject res) {
      // result is a JSONObject
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

$specifications = [
    'strict' => true,
    'fields' => [
        'foo' => [
            'mandatory' => true,
            'type' => 'string',
            'defaultValue' => 'bar'
        ]
    ]
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  // result is an array
  $res = $dataCollection->updateSpecifications($specifications);
}
catch (ErrorException $e) {

}
```

> Callback response

```json
{
  "index": {
    "collection": {
      "strict":"true",
      "fields": {
        "foo": {
          "mandatory": "true",
          "type": "string",
          "defaultValue": "bar"
        }
      }
    }
  }
}
```

Update parts of a specification, by replacing some fields or adding new ones.  
Note that you cannot remove fields this way: missing fields will simply be left unchanged.

---

## updateSpecifications(content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON object | Content of the specification to update |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle Backend will wait the persistence layer to finish indexing (available with Elasticsearch 5.x and above) | ``undefined`` |
| ``retryOnConflict`` | int | Number of retries to attempt before rejecting this update because of a cluster sync conflict | `0` |

---

## Return Value

Returns the `Collection` object to allow chaining.
