---
layout: side-code.html
words:  164
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: exists
---

# exists

```js
// Using callbacks (NodeJS or Web Browser)
document.exists(function (error, exists) {
  // called once the exists check has been completed
});
```

```java
document.exists(new ResponseListener<Boolean>() {
    @Override
    public void onSuccess(Boolean exists) {
      // called once the exists check has been completed
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
  $exists = $document->exists();
} catch (ErrorException $e) {

}
```

Checks if the document exists in Kuzzle.

---

## exists([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queueable | ``true`` |

---

## Callback response

Resolves to a boolean indicating whether or not the document exists in Kuzzle
