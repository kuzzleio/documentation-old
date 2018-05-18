---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: apply
---

# apply

```js
// Using callbacks (NodeJS or Web Browser)
dataMapping.apply(function (error, result) {
  // called once the mapping action has been completed
});

// Using promises (NodeJS)
dataMapping.applyPromise().then(function (error, result) {
  // resolved once the mapping action has been completed
});
```

```java
dataMapping.apply(new ResponseListener<CollectionMapping>() {
   @Override
   public void onSuccess(CollectionMapping object) {
     // called once the mapping action has been completed
   }

   @Override
   public void onError(JSONObject error) {
     // Handle error
   }
});
```

```php
<?php

use \Kuzzle\DataMapping;

// ...

/**
 * @var $dataMapping DataMapping
 */
$dataMapping->apply();
```

Applies the new mapping to the data collection.

---

## apply([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

## Return Value

Returns this `CollectionMapping` object to allow chaining.

---

## Callback Response

Returns the updated `CollectionMapping` object.
