---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: replaceUser
---

# replaceUser

```js
var newContent = {
  profileIds: ['admin'],
  firstname: 'My Name Is',
  lastname: 'Jonas'
};


// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .replaceUser("User ID", newContent, function (err, replacedUser) {
    // "replacedUser" is an instance of a User object
  });
```

```java
JSONObject newContent = new JSONObject()
  .put("profileIds", new JSONArray()
    .put("admin")
  )
  .put("firstname", "My Name Is")
  .put("lastname", "Jonas");

kuzzle
  .security
  .replaceUser("User ID", newContent, new ResponseListener<User>() {
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
  'profileIds' => ['admin'],
  'firstname' => 'My Name Is',
  'lastname' => 'Jonas'
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $user = $security->replaceUser($kuid, $userDefinition);

  // $user instanceof User
}
catch (ErrorException $e) {

}
```

Replaces an existing user.

---

## replaceUser(id, content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique user identifier |
| ``content`` | JSON Object | A plain JSON object representing the user, should contain the mandatory ``profileIds`` field |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | (Optional) Callback handling the response |

---

## Options

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait for the persistence layer to finish indexing (available with Elasticsearch 5.x and above) | ``undefined`` |

---

## Return Value

Returns the `Security` object to allow chaining.

---

## Callback Response

Returns a [User]({{ site_base_path }}sdk-reference/user) object.
