---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: saveRestricted
---

# saveRestricted

```js
// Using callbacks (NodeJS or Web Browser)
user
  .saveRestricted(function(error, result) {
    // result is a User object
  });

// Using promises (NodeJS)
user
  .saveRestrictedPromise()
  .then(result => {
    // result is a User object
  });
```

```java
user.saveRestricted(new ResponseListener<User>() {
  @Override
  public void onSuccess(User user) {

  }

  @Override
  public void onError(JSONObject error) {

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
  $user->saveRestricted();
}
catch (ErrorException $e) {

}
```

Saves this user as restricted in Kuzzle Backend's database layer.


---

## saveRestricted([options], [callback])

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

## Return Value

Returns the `User` object to allow chaining.

---

## Callback Response

Returns a `User` object.
