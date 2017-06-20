---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: deleteRole
---

# deleteRole

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .deleteRole('myrole', function(error, result) {

  });

// Using promises (NodeJS)
kuzzle
  .security
  .deleteRolePromise('myrole')
  .then((result) => {

  });
```

```java
kuzzle
  .security
  .deleteRole("myrole", new ResponseListener<String>() {
    @Override
    public void onSuccess(String roleName) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;

$roleId = 'myRole';

$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->security()->deleteRole($roleId);
}
catch (ErrorException $e) {

}
```

> Callback response

```json
"deleted role identifier"
```

Delete the provided role.

<aside class="notice">
There is a small delay between role deletion and their deletion in our search layer, usually a couple of seconds.
That means that a role that was just been delete will be returned by <code>searchRoles</code> function
</aside>

---

## deleteRole(id, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier to delete |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns the `Security` object to allow chaining.

---

## Callback response

Resolves the role id which has been deleted.
