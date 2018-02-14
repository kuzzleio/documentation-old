---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: replace
---

# replace

```js
// Using callbacks (NodeJS or Web Browser)
document.replace(function (error, result) {
    // result is a Document object
  });

// Using promises (NodeJS)
document.replacePromise()
  .then(result => {
    // result is a Document object
  });
```

```java
JSONObject newContent = new JSONObject("new", "document content");

document.replace(new ResponseListener<Document>() {
    @Override
    public void onSuccess(Document document) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Document;

try {
  $document = $document->replace();

  // $document instanceof Document
}
catch (ErrorException $e) {

}
```

Replace an existing document and returns the updated version of it as a [Document]({{ site_base_path }}sdk-reference/document/) object.

---

## replace([options], [callback])

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

---

## Return value

Returns the `Document` object to allow chaining.

---

## Callback response

Resolves to an updated `Document` object.