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
user
  .replace(function(error, result) {
    // result is a User object
  });

// Using promises (NodeJS)
user
  .replacePromise()
  .then(result => {
    // result is a User object
  });
```

```java
user.replace(new ResponseListener<User>() {
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
  $user->replace();
}
catch (ErrorException $e) {

}
```

Replaces the user in kuzzle.

---

## replace([options], [callback])

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

## Return value

Returns the `User` object to allow chaining.

---

## Callback response

Resolves to a `User` object.
