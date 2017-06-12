---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getSpecifications
---

# getSpecifications

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .getSpecifications(function (error, res) {
    res.hits.forEach(function (specification) {
      console.log(specification);
    });
    
    res.total // Total specifications count
  });

// Using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .getSpecificationsPromise()
  .then(res => {
    res.hits.forEach(function (specification) {
      console.log(specification);
    });
    
    res.total // Total specifications count
  });
```

```java
kuzzle
  .collection("collection", "index")
  .getSpecifications(new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject res) {
      for (int i = 0; i < res.getJSONArray("hits").length(); i++) {
        res.getJSONArray("hits").getJSONObject(i) // Specification
      }

      res.getString("total"); // Total specifications count
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
  $res = $dataCollection->getSpecifications();

  foreach ($res['hits'] as $specification) {
    // Specification
  }

  // Total specifications count
  $res['total'];
}
catch (ErrorException $e) {

}
```

Retrieves the specifications linked to the collection object.

---

## getSpecifications([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

```json
{
  "validation": {
    "strict": "true",
      "fields": {
        "foo": {
          "mandatory": "true",
          "type": "string",
          "defaultValue": "bar"
        }
      }
    },
  "index": "index",
  "collection": "collection"
}
```
