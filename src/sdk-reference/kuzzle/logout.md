---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: logout
---

# logout

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.logout(function (err, res) {
  // ...
});

// Using promises (NodeJS only)
kuzzle.logoutPromise()
  .then(res => {
    // ...
  });
```

```java
kuzzle.logout(new ResponseListener<Void>() {
  @Override
  public void onSuccess(Void result) {
    // ...
  }

  @Override
  public void onError() {
    // Handle error
  }
});
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->logout();
  // everything went fine
}
catch (ErrorException $e) {

}
```

Logs the user out.

<aside class="notice">
This method is non-queuable, meaning that during offline mode, it will be discarded and the callback will be called with an error.
</aside>

---

## logout([callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``callback`` | function | Optional callback handling the response |

This method empties the `jwtToken` property

---

## Return value

Returns the `Kuzzle` object to allow chaining.

---

## Callback response

Resolves to the `Kuzzle` object itself once the logout process is complete, either successfully or not.  
The `Kuzzle` object will unset the property `jwtToken` if the user is successfully logged out.
