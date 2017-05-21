---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: user
---

# user

```js
var userContent = {
  // A "profileIds" field is required to bind a user to an existing profile
  profileIds: ['some profile'],

  // The "local" authentication strategy requires a password
  password: 'secretPassword',

  // You can also set custom fields to your user
  firstname: 'John',
  lastname: 'Doe'
};

var user = kuzzle.security.user('myuser', userContent);
```

```java
JSONObject userContent = new JSONObject()
    // A "profileIds" field is required to bind a user to an existing profile
    .put("profileIds", new JSONArray().put('someProfile'))
    // The "local" authentication strategy requires a password
    .put("password", "a password")
    // You can also set custom fields to your user
    .put("firstname", "John")
    .put("lastname", "Doe");

User user = kuzzle.security.user("<kuid>", userContent);  
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$kuid = 'myUser';
$userDefinition = [
  // A "profileIds" field is required to bind a user to an existing profile
  'profileIds' => ['myProfile'],
  // The "local" authentication strategy requires a password
  'password' => 'secret',
  'firstname' => 'John',
  'lastname' => 'Doe'
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

$user = $security->user($kuid, $userDefinition);
// $user instanceof User
```

Instantiates a new [User]({{ site_base_path }}sdk-reference/user) object.

---

## user(id, content)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique user identifier |
| ``content`` | JSON Object | User content |

---

## Return value

Returns the new [User]({{ site_base_path }}sdk-reference/user) object.
