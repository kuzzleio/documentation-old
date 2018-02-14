---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: update
---

# update

```js
// Using callbacks (NodeJS or Web Browser)
document.update('documentId', {title: 'foo', content: 'bar'}, function (error, result) {
    // result is a Document object
  });

// Using promises (NodeJS)
document.updatePromise('documentId', {title: 'foo', content: 'bar'})
  .then(result => {
    // result is a Document object
  });
```

```java
  myDocument.update(new ResponseListener<Document>() {
    @Override
    public void onSuccess(Document result) {
      // result is an updated Document object
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
use \Kuzzle\Document;

try {
  $document = $document->update();

  // $document instanceof Document
}
catch (ErrorException $e) {

}
```

Update parts of a document, by replacing some fields or adding new ones.  
Note that you cannot remove fields this way: missing fields will simply be left unchanged.

---

## update([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the persistence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |
| `retryOnConflict` | int | Number of retries to attempt before rejecting this update because of a cluster sync conflict | `0` |

---

## Return value

Returns the `Document` object to allow chaining.

---

## Callback response

Resolves to an up-to-date `Document` object.