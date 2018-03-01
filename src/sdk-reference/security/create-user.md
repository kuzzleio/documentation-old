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
var user = {
  content: {
    // A "profileIds" field is required to bind a user to existing profiles
    profileIds: ['admin'],

    // Additional information may be provided
    firstname: 'John',
    lastname: 'Doe'
  },
  credentials: {
    // Authentication strategy to use
    "local": {
      // The necessary information to provide vary,
      // depending on the chosen authentication strategy
      "username": "jdoe",
      "password": "secret password"
    }
  }
};

var options = {};


// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .createUser('myuser', user, options, function(error, response) {
    // result is a User object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .createUserPromise('myuser', user, options)
  .then(response => {
    // result is a User object
  });
```

```java
JSONObject content = new JSONObject()
  // A "profileIds" field is required to bind a user to existing profiles
  .put("profileIds", new JSONArray()
    .put("admin")
  )
  // You can also set custom fields to your user
  .put("firstname", "John")
  .put("lastname", "Doe");

JSONObject newUser = new JSONObject().put("content", content);

JSONObject credentials = new JSONObject()
  // Authentication strategy to use
  .put("local", new JSONObject()
    // The necessary information to provide vary,
    // depending on the chosen authentication strategy
    .put("password", "secret password")
    .put("username", "jdoe")
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
      // A "profileIds" field is required to bind a user to existing profiles
      'profileIds' => ['admin'],
      // You can also set custom fields to your user
      'firstname' => 'John',
      'lastname' => 'Doe'
    ],
    'credentials' => [
      // Authentication strategy to use
      'local' => [
        // The necessary information to provide vary,
        // depending on the chosen authentication strategy
        'password' => 'secret password',
        'username' => 'jdoe'
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
There is a small delay between user creation and its availability in our search layer (usually a couple of seconds).
That means that a user that was just created may not be returned by the <code>searchUsers</code> function at first.
</aside>

---

## createUser(id, user, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | [Unique user identifier]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid) |
| ``user`` | JSON Object | A plain JSON object representing the user (see below) |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | Callback handling the response |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the persistence layer to finish indexing (available with Elasticsearch 5.x and above) | ``undefined`` |


The `user` object to provide must have the following properties:

* `content` (JSON object): user global properties
  * This object must contain a `profileIds` properties, an array of strings listing the security [profiles]({{ site_base_path }}guide/essentials/security/#users-profiles-and-roles) to be attached to the new user 
  * Any other property will be copied as additional global user information
* `credentials` (JSON object): a description of how the new user can identify themselves on Kuzzle
  * Any number of credentials can be added, each one being an object with name equal to the [authentication strategy]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy/#expose-authentication-strategies) used to authenticate the user, and with the login data as content.
  * If this object is left empty, the user will be created in Kuzzle but the will not be able to login.

---

## Options

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

## Callback Response

Returns a [User]({{ site_base_path }}sdk-reference/user) object.
