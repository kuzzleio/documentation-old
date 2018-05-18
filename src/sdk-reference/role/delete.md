---
layout: side-code.html.handlebars
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

Deletes the role from Kuzzle.

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
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

## Callback Response

Returns the ID of the deleted role.
