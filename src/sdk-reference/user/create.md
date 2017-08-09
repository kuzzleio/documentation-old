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
user
  .create(function(error, result) {
    // result is a User object
  });

// Using promises (NodeJS)
user
  .createPromise()
  .then(result => {
    // result is a User object
  });
```

```java
user.create(new ResponseListener<User>() {
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
  $user->create();
}
catch (ErrorException $e) {

}
```

Create the user in kuzzle. Credentials can be created during the process by using [setCredentials]({{ site_base_path }}sdk-reference/user/set-credentials) beforehand.

---

## create([options], [callback])

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
