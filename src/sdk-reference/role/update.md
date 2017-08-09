---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: update
---

# update

```js
var updateContent = {
  controllers: {
    "document": {
      actions: {
        "get": true
      }
    }
  }
};

// Using callbacks (NodeJS or Web Browser)
role.update(updateContent, function(err, updatedRole) {
  // the updatedRole variable is the updated Role object
})

// Using promises (NodeJS)
role
  .updatePromise(updateContent)
  .then(updatedRole => {
    // the updatedRole variable is the updated Role object
  });
```

```java
JSONObject roleDefinition = new JSONObject()
  .put("controllers", new JSONObject()
    .put("document", new JSONObject()
      .put("actions", new JSONObject()
        .put("get", true)
      )
    )
  )
);

role.update(roleDefinition, new ResponseListener<Role>() {
  @Override
  public void onSuccess(Role updatedRole) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\Role;

// ...

$roleDefinition = [
  'controllers' => [
    'document' => [
      'actions' => [
        'get' => true
      ]
    ]
  ]
];

/*
 * @var $role Role
 */

try {
  $role = $role->update($roleDefinition);

  // $role instanceof Role
}
catch (ErrorException $e) {
  // error occured
}
```

Updates the role object Kuzzle's database layer.

<aside class="warning">
  <p>
    Unlike a regular document update, this method will replace the whole role definition under the indexes node with the <code>updateContent</code> parameter.<br>
    In other words, you always need to provide the complete role definition in the <code>updateContent</code> object.
  </p>
  <p>
    This method has the same effect as calling <a href="{{ site_base_path }}sdk-reference/role/set-content"><code>setContent</code></a> followed by the <a href="{{ site_base_path }}sdk-reference/role/save"><code>save</code></a> method.
  </p>
</aside>

To get more information on Kuzzle permissions, please refer to our [Kuzzle Permissions guide]({{ site_base_path }}guide/essentials/security/#permissions).

---

## update(content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | New role content |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns the `Role` object to allow chaining.

---

## Callback response

Resolves to the updated version of this object
