---
layout: side-code.html
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
user
  .delete(function(error, result) {
    // result is the id of deleted user
  });

// Using promises (NodeJS)
user
  .deletePromise()
  .then(result => {
    // result is the id of deleted user
  });
```

```java
user.delete(new ResponseListener<String>() {
  @Override
  public void onSuccess(String deletedId) {

  }

  @Override public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\User;

// ...

/*
 * @var $user User
 */

try {
  $user->delete();
}
catch (ErrorException $e) {

}
```

Deletes the user in Kuzzle

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
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves to a `String` containing the deleted user ID
