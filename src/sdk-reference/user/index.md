---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: User
description: Permission users manipulation
show-subheader: true
subheader-title: Constructor
---

# Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 User objects are returned by Security.user method:
 */
 var userContent = {
   // A "profile" field is required to bind a user to an existing profile
   profileIds: ['admin'],

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
  // A "profile" field is required to bind a user to an existing profile
  .put("profileIds", new JSONArray().put("admin"))
  // The "local" authentication strategy requires a password
  .put("password", "secret password")
  // You can also set custom fields to your user
  .put("firstname", "John")
  .put("lastname", "Doe");

// Using the KuzzleSecurity factory:
User user = kuzzle.security.user("user ID", userContent);

// Or directly with the constructor:
User user = new User(kuzzle.security, "user ID", userContent);
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

// Using the Security factory
$user = $security->user($kuid, $userDefinition);

// Or directly with the constructor:
$user = new User($security, $kuid, $userDefinition);
```

Instantiates a new User object, which is a representation of a Kuzzle user and is linked to a security [Profile]({{ site_base_path }}sdk-reference/profile).


---

## User(Security, id, content, [meta])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Security`` | Security | An instantiated Security object |
| ``id`` | string | Unique user identifier |
| ``content`` | JSON Object | User content |
| ``meta`` | JSON Object | User metadata |

**Note:**  this constructor won't make any call to Kuzzle.

---

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| `content` | JSON object | Raw user content | get |
| `id` | string | Unique profile identifier | get |
| `meta` | JSON object | User metadata | get |

---

## Return Value

Returns the `User` object.
