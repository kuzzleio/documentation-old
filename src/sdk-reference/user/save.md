---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: save
---

# save

```js
// Using callbacks (NodeJS or Web Browser)
user
  .save(function(error, result) {
    // result is a User object
  });

// Using promises (NodeJS)
user
  .savePromise()
  .then((result) => {
    // result is a User object
  });
```

```java
user.save(new ResponseListener<User> {
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
  $user = $user->save();

  // $user instanceof User
}
catch (ErrorException $e) {
  // error occured
}
```

Creates or replaces this user in Kuzzle's database layer.

---

## save([options], [callback])

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

## Return value

Returns the `User` object to allow chaining.

---

## Callback response

Resolves to a `User` object.
