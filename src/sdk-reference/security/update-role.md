---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: updateRole
---

# updateRole

```js
var roleDefinition = {
  controllers: {
    "read": {
      actions: {
        "get": true
      }
    }
  }
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .updateRole("role ID", roleDefinition, function (err, updatedRole) {
    // "updatedRole" is an instance of a Role object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .updateRolePromise("profile ID", roleDefinition)
  .then(updatedRole => {
    // "updatedRole" is an instance of a Role object
  });
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

kuzzle
  .security
  .updateRole("Role ID", roleDefinition, new ResponseListener<Role>() {
    @Override
    public void onSuccess(Role role) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
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

try {
  $role = $security->updateRole($roleId, $roleDefinition);

  // $role instanceof Role
}
catch (ErrorException $e) {

}
```

Performs a partial update on an existing role.

---

## updateRole(id, content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier |
| ``content`` | JSON Object | A plain JSON object representing the role |
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

Resolves to an updated [Role]({{ site_base_path }}sdk-reference/role) object
