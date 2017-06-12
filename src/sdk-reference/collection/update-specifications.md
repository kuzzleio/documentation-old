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
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .updateSpecifications({specification: 'content'}, function (err, res) {
    // result is a JSON object
  });

// Using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .updateSpecificationsPromise({specification: 'content'})
  .then(res => {
    // result is a JSON object
  });
```

```java
JSONObject specificationContent = new JSONObject().put("specification", "content");

kuzzle
  .collection("collection", "index")
  .updateSpecifications(specificationContent, new ResponseListener<JSONObject>() {
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

$documentId = 'foobar';
$specificationContent = [
  'specification' => 'content'
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  // result is an array
  $res = $dataCollection->updateSpecifications($specificationContent);
}
catch (ErrorException $e) {

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
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the persistence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |
| ``retryOnConflict`` | int | Number of retries to attempt before rejecting this update because of a cluster sync conflict | `0` |

---

## Return value

Returns the `Collection` object to allow chaining.

---

## Callback response

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
