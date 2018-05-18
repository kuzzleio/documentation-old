---
layout: side-code.html.handlebars
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

Instantiates a new `Role` object, which defines a set of right policies.

---

## Role(Security, id, content, [meta])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Security`` | Security | An instantiated [Security]({{ site_base_path }}sdk-reference/security) object |
| ``id`` | string | Unique role identifier |
| ``content`` | JSON Object | Role content |
| ``meta`` | JSON Object | Role metadata |

**Note:**  this constructor won't make any call to Kuzzle.

---

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| `content` | JSON object | Raw role content | get |
| `id` | string | Unique profile identifier | get |
| `meta` | JSON object | Role metadata | get |

---

## Return Value

Returns the `Role` object.
