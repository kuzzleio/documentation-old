---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: update
---

# update

```js
var updateContent = {
  firstname: 'My Name Is',
  lastname: 'Jonas'
};

// Using callbacks (NodeJS or Web Browser)
user.update(updateContent, function(err, updatedUser) {
  // the updatedUser variable is the updated User object
});

// Using promises (NodeJS)
role
  .updatePromise(updateContent)
  .then(updatedUser => {
    // the updatedUser variable is the updated User object
  });
```

```java
JSONObject updateContent = new JSONObject()
  .put("firstname", "My Name Is")
  .put("lastname", "Jonas");

user.update(updateContent, new ResponseListener<User>() {
  @Override
  public void onSuccess(User updatedUser) {

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

$userContent = [
  'firstname' => 'My Name Is',
  'lastname' => 'Jonas'
];

try {
  $user->update($userContent);
}
catch (ErrorException $e) {

}
```

Performs a partial content update on this object.

---

## update(content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | User content |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback handling the response |

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

Resolves to the updated version of this object
