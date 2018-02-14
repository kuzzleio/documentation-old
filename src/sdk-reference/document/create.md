---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: create
---

# create

```js
// Using callbacks (NodeJS or Web Browser)
document.create(function (error, result) {
  // called once the create action has been completed
});

// Using promises (NodeJS)
document.createPromise().then(result => {
  // called once the create action has been completed
});
```

```java
document.create(new ResponseListener<Document>() {
    @Override
    public void onSuccess(Document object) {
      // called once the create action has been completed
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

Create a new document in Kuzzle and resolves to a Document object.

---

## create([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON Object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the persistence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |
| ``ifExist`` | string | If the same document already exists: resolves to an error if sets to ``error``. Replaces the existing document if set to ``replace`` | ``false`` |

---

## Return value

Returns this `Document` object to allow chaining.

---

## Callback response

Resolves to this `Document` object once the document has been saved.
