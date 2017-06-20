---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: whoAmI
---

# whoAmI

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.whoAmI(function (err, result) {
  // "result" is a User object
});

// Using promises (NodeJS only)
kuzzle.whoAmIPromise()
  .then(res => {
    // "res" is a User object
  });
```

```java
kuzzle.whoAmI(new ResponseListener<User>() {
  @Override
  public void onSuccess(User myself) {

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

$kuzzle = new Kuzzle('localhost');

try {
  $me = $kuzzle->whoAmI();
  // $me instanceof User
}
catch (ErrorException $e) {

}
```

Retrieves informations about the currently logged user.

---

## whoAmI(callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``callback`` | function | Callback handling the response |

---

## Callback response

An instantiated [User]({{ site_base_path }}sdk-reference/user) object.
