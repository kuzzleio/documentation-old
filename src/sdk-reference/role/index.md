---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: Role
description: Permission roles manipulation
show-subheader: true
subheader-title: Constructor
---

# Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 Role objects are returned by Security.role method:
 */
var roleDefinition = {
  controllers: {
    "*": {
      actions: {
        "*": true
      }
    }
  }
};

var role = kuzzle.security.role('myrole', roleDefinition);
```

```java
JSONObject roleDefinition = new JSONObject()
  .put("controllers", new JSONObject()
    .put("*", new JSONObject()
      .put("actions", new JSONObject()
        .put("*", true)
      )
    )
  )
);

Role role = new Role(kuzzle.security, "role ID", roleDefinition);
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Role;

$roleId = 'myRole';
$roleDefinition = [
  'controllers' => [
    '*' => [
      'actions' => [
        '*' => true
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

// Using the Security factory:
$role = $security->role($roleId, $roleDefinition);

// Or directly with the constructor:
$role = new Role($security, $roleId, $roleDefinition);
```

Instantiates a new `Role` object, which is a representation of a set of right policies.

---

## Role(Security, id, content)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Security`` | Security | An instantiated Security object |
| ``id`` | string | Unique role identifier |
| ``content`` | JSON Object | Role content |

**Note:**  this constructor won't make any call to Kuzzle.

---

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| `content` | JSON object | Raw role content | get |
| `id` | string | Unique profile identifier | get |

---

## Return value

Returns the `Role` object.
