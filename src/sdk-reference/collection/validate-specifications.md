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
  .validateSpecifications(specifications, function (err, isValid) {
    // isValid is a boolean
  });

// Using promises (NodeJS)
kuzzle
  .collection('collection', 'index')
  .validateSpecificationsPromise(specifications)
  .then(isValid => {
    // isValid is a boolean
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
  .validateSpecifications(specifications, new ResponseListener<Boolean>() {
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
  // $isValid is a boolean
  $isValid = $dataCollection->validateSpecifications($specifications);
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
