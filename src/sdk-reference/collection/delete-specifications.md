---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: deleteSpecifications
---

# deleteSpecifications

```js
// Deleting specifications using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .deleteSpecifications(function (err, deleted) {
    // callback called once the delete action has been completed
  });

// Deleting specifications using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .deleteSpecificationsPromise()
  .then(deleted => {
    // promises resolved once the delete action has been completed
  });
```

```java
// Deleting one document
kuzzle
  .collection("collection", "index")
  .deleteSpecifications(new ResponseListener<Boolean>() {
    @Override
    public void onSuccess(Boolean deleted) {

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

// Deleting one document
try {
  $deleted = $dataCollection->deleteSpecifications();
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
true
```

Delete specifications linked to the collection object.

---

## deleteSpecifications([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the persistence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |

---

## Return value

Returns the `Collection` object to allow chaining.

---

## Callback response

Resolves to a boolean confirming the success of the delete action.
