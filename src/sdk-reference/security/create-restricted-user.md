---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: createRestrictedUser
---

# createRestrictedUser

```js
var userContent = {
  content: {
  },
  credentials: {
    local: {
      // The "local" authentication strategy requires a password
      password: 'secretPassword',
      lastLoggedIn: 1494411803
    }
  }
};


// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .createRestrictedUser('myuser', userContent, options, function(error, response) {
    // result is a User object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .createRestrictedUserPromise('myuser', userContent, options)
  .then((response) => {
    // result is a User object
  });
```

```java
JSONObject content = new JSONObject();

JSONObject newUser = new JSONObject().put("content", content);

JSONObject credentials = new JSONObject()
  .put("local", new JSONObject()
  // The "local" authentication strategy requires a password
  .put("password", "secret password")
  .put("lastLoggedIn", 1494411803));

newUser.put("credentials", credentials);

Options opts = new Options().setReplaceIfExist(true);

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
  $user = $security->createRestrictedUser($kuid, $userDefinition);

  // $user instanceof User
}
catch (ErrorException $e) {

}
```

Create a new restricted user in Kuzzle Backend.  
This function allows anonymous users to create a "restricted" user with predefined rights.

<aside class="notice">
There is a small delay between user creation and its availability in our search layer (usually a couple of seconds).
That means that a user that was just created may not be returned by the <code>searchUsers</code> function at first.
</aside>

---

## createRestrictedUser(id, content, [options], [callback])

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
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the persistence layer indexation to return (available with Elasticsearch 5.x and above) | ``undefined`` |

---

## Callback response

Resolves to a [User]({{ site_base_path }}sdk-reference/user) object.
