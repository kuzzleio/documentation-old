---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: validateSpecifications
---

# validateSpecifications

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .validateSpecifications({specification: 'content'}, function (err, isValid) {
    // isValid is a boolean
  });

// Using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .validateSpecificationsPromise({specification: 'content'})
  .then(isValid => {
    // isValid is a boolean
  });
```

```java
JSONObject specificationContent = new JSONObject().put("specification", "content");

kuzzle
  .collection("collection", "index")
  .validateSpecifications(specificationContent, new ResponseListener<Boolean>() {
    @Override
    public void onSuccess(Boolean isValid) {
      // isValid is a boolean
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
  // $isValid is a boolean
  $isValid = $dataCollection->validateSpecifications($specificationContent);
}
catch (ErrorException $e) {

}
```

Validate a specification, returning whether or not the provided specification as a valid format or not.

---

## validateSpecifications(content, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON object | Content of the specification to validate |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves to a boolean indicating whether or not the provided specifications are valid or not.
