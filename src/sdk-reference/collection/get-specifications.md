---
layout: side-code.html.hbs
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
  .getSpecifications(function (error, specifications) {
    // specifications is a JSON object
  });

// Using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .getSpecificationsPromise()
  .then(specifications => {
    // specifications is a JSON object
  });
```

```java
kuzzle
  .collection("collection", "index")
  .getSpecifications(new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject specifications) {
        // specifications is a JSONObject
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
  $specifications = $dataCollection->getSpecifications();
}
catch (ErrorException $e) {

}
```

> Callback response

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
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
