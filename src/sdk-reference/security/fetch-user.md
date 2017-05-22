---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: fetchUser
---

# fetchUser

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .fetchUser('myuser', function(error, result) {
    // result is a User object
  })

// Using promises (NodeJS)
kuzzle
  .security
  .fetchUserPromise('myuser')
  .then((result) => {
    // result is a User object
  })
```

```java
kuzzle
  .security
  .fetchUser("myuser", new ResponseListener<User>() {
    @Override
    public void onSuccess(User user) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$kuid = 'myUser';

$kuzzle = new Kuzzle('localhost');

try {
  $user = $kuzzle->security()->fetchUser($kuid);

  // $user instanceof User
}
catch (ErrorException $e) {

}
```

Retrieves a single stored user using its unique ID.

---

## fetchUser(id, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique user identifier |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves to a [User]({{ site_base_path }}sdk-reference/user) object.
