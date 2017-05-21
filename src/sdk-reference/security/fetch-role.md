---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: fetchRole
---

# fetchRole

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .fetchRole('myrole', function(error, result) {
    // result is a Role object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .fetchRolePromise('myrole')
  .then((result) => {
    // result is a Role object
  });
```

```java

kuzzle
  .security
  .fetchRole("myrole", new ResponseListener<Role>() {
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

$kuzzle = new Kuzzle('localhost');

try {
  $role = $kuzzle->security()->fetchRole($roleId);

  // $role instanceof Role
}
catch (ErrorException $e) {

}
```

Retrieves a single stored role using its unique ID.

---

## fetchRole(id, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves to a [Role]({{ site_base_path }}sdk-reference/role) object.
