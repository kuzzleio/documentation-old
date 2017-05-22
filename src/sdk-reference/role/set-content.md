---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setContent
---

# setContent

```js
var roleDefinition = {
  controllers: {
    "*": {
      actions: {
        "*": true
      }
    }
  }
};

role = role.setContent(roleDefinition);
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

role.setContent(roleDefinition);
```

```php
<?php

use Kuzzle\Security\Role;

// ...

$roleDefinition = [
  'controllers' => [
    '*' => [
      'actions' => [
        '*' => true
      ]
    ]
  ]
];

/*
 * @var $role Role
 */
$role->setContent($roleDefinition);
```

Replaces the content of the `Role` object.

<aside class="note">
Updating a role content will have no impact until the <a href="{{ site_base_path }}sdk-reference/role/save">save</a> method is called
</aside>

---

## setContent(data)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``data`` | JSON Object | Role content |

---

## Return value

Returns the `Role` object.
