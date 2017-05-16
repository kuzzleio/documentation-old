---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: deleteUser
---

# deleteUser

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .deleteUser('myuser', function(error, result) {

  });

// Using promises (NodeJS)
kuzzle
  .security
  .deleteUserPromise('myuser')
  .then((result) => {

  });
```

```java
kuzzle
  .security
  .deleteUser("myuser", new ResponseListener<String>() {
    @Override
    public void onSuccess(String userName) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;

$kuid = 'myUser';

$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->security()->deleteUser($kuid);
}
catch (ErrorException $e) {

}
```

> Callback response

```json
"deleted user identifier"
```

Delete the provided user.

<aside class="notice">
There is a small delay between user deletion and their deletion in our search layer, usually a couple of seconds.
That means that a user that has just been delete will be returned by <code>searchUsers</code> function
</aside>

---

## deleteUser(id, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique user identifier to delete |
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

Resolves the user id which has been deleted.
