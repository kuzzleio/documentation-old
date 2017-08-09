---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: createUser
---

# createUser

```js
var userContent = {
  content: {
    // A "profile" field is required to bind a user to an existing profile
    profileIds: ['admin'],
    firstname: 'John',
    lastname: 'Doe'
  },
  credentials: {
    local: {
      // The "local" authentication strategy requires a password
      password: 'secretPassword',
      // You can also set custom fields to your user
      lastLoggedIn: 1494411803
    }
  }
};

var options = {};


// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .createUser('myuser', userContent, options, function(error, response) {
    // result is a User object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .createUserPromise('myuser', userContent, options)
  .then((response) => {
    // result is a User object
  });
```

```java
JSONObject content = new JSONObject()
  // A "profile" field is required to bind a user to existing profiles
  .put("profileIds", new JSONArray()
    .put("admin")
  )
  // You can also set custom fields to your user
  .put("firstname", "John")
  .put("lastname", "Doe");

JSONObject newUser = new JSONObject().put("content", content);

JSONObject credentials = new JSONObject()
  .put("local", new JSONObject()
    // The "local" authentication strategy requires a password
    .put("password", "secret password")
    .put("lastLoggedIn", 1494411803)
  );

newUser.put("credentials", credentials);

Options opts = new Options();

kuzzle
  .security
  .createUser("myNewUser", newUser, opts, new ResponseListener<User>() {
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
    'content' => [
      // A "profile" field is required to bind a user to an existing profile
      'profileIds' => ['admin'],
      // You can also set custom fields to your user
      'firstname' => 'John',
      'lastname' => 'Doe'
    ],
    'credentials' => [
      'local' => [
        // The "local" authentication strategy requires a password
        'password' => 'secretPassword',
        'lastLoggedIn' => 1494411803
      ]
    ]
  ];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $user = $security->createUser($kuid, $userDefinition);

  // $user instanceof User
}
catch (ErrorException $e) {

}
```

Create a new user in Kuzzle.

<aside class="notice">
There is a small delay between user creation and their creation in our search layer, usually a couple of seconds.
That means that a user that was just been created will not be returned by <code>searchUsers</code> function
</aside>

---

## createUser(id, content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique user identifier, will be used as username |
| ``content`` | JSON Object | A plain JSON object representing the user |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | Callback handling the response |

---

## Options

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves to a [User]({{ site_base_path }}sdk-reference/user) object.
