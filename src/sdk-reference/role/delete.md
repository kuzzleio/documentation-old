---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: delete
---

# delete

```js
// Using callbacks (NodeJS or Web Browser)
role.delete(function(error, deletedId) {
  // ...
});

// Using promises (NodeJS)
role.deletePromise()
  .then(deletedId => {
    // ...
  });
```

```java
role.delete(new ResponseListener<String>() {
  @Override
  public void onSuccess(String deletedId) {

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

/*
 * @var $role Role
 */
try {
  $role->delete();
}
catch(ErrorException $e) {
  // error occurred
}
```

Deletes the role from Kuzzle's database layer.

---

## delete([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves to the id of the deleted role.
