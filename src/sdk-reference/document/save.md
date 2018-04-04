---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: save
---

# save

```js
// Using callbacks (NodeJS or Web Browser)
document.save(function (error, result) {
  // called once the save action has been completed
});

// Using promises (NodeJS)
document.savePromise().then(result => {
  // called once the save action has been completed
});
```

```java
document.save(new ResponseListener<Document>() {
    @Override
    public void onSuccess(Document object) {
      // called once the save action has been completed
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
});
```

```php
<?php

use \Kuzzle\Document;

// ...

/**
 * @var $document Document
 */

try {
  $document->save();
} catch (ErrorException $e) {

}
```

Saves this document into Kuzzle.

If this is a new document, this function will create it in Kuzzle and the ``id`` property will be made available.  
Otherwise, this method will replace the latest version of the document in Kuzzle with the content of this current object.

---

## save([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON Object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait for the persistence layer to finish indexing (available with Elasticsearch 5.x and above) | ``undefined`` |

---

## Return Value

Returns this `Document` object to allow chaining.

---

## Callback Response

Return this `Document` object once the document has been saved.
