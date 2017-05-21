---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: updateUser
---

# updateUser

```js
var newContent = {
  firstname: 'My Name Is',
  lastname: 'Jonas'
};


// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .updateUser("User ID", newContent, function (err, updatedUser) {
    // "updatedUser" is an instance of a User object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .updateUserPromise("User ID", newContent)
  .then(updatedUser => {
    // "updatedUser" is an instance of a User object
  });
```

```java
JSONObject newContent = new JSONObject()
  .put("firstname", "My Name Is")
  .put("lastname", "Jonas");

kuzzle
  .security
  .updateUser("User ID", newContent, new ResponseListener<User>() {
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

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$kuid = 'myUser';
$userDefinition = [
  'firstname' => 'My Name Is',
  'lastname' => 'Jonas'
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $user = $security->updateUser($kuid, $userDefinition);

  // $user instanceof User
}
catch (ErrorException $e) {

}
```

Performs a partial update on an existing user.

---

## updateUser(id, content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier |
| ``content`` | JSON Object | A plain JSON object representing the user |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | (Optional) Callback handling the response |

---

## Options

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns the `Security` object to allow chaining.

---

## Callback response

Resolves to an updated [User]({{ site_base_path }}sdk-reference/user) object
