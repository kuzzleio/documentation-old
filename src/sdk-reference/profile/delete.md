---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: delete
---

# delete

```js
// Using callbacks (NodeJS or Web Browser)
profile
  .delete(function(error, result) {
    // result is the id of deleted profile
  });

// Using promises (NodeJS)
profile
  .deletePromise()
  .then((result) => {
    // result is the id of deleted profile
  });
```

```java
profile
  .delete(new ResponseListener<String>() {
    @Override
    public void onSuccess(String deleteId) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use Kuzzle\Security\Profile;

// ...

/*
 * @var $profile Profile
 */
try {
  $profile->delete();
}
catch(ErrorException $e) {

}
```

Deletes this security profile from Kuzzle.

---

## delete([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

## Callback Response

Returns the ID of the deleted profile.
