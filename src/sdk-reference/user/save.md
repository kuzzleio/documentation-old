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
role
  .save(function(error, result) {
    // result is a Role object
  });

// Using promises (NodeJS)
role
  .savePromise()
  .then((result) => {
    // result is a Role object
  });
```

```java
role.save(new ResponseListener<Role> {
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

use Kuzzle\Security\Role;

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
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns the `User` object to allow chaining.

---

## Callback response

Resolves to a `User` object.
