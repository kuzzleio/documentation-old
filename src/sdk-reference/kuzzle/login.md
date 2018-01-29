---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: login
---

# login

```js
// Expiration time is expressed as a string following the
// time conversion library: https://www.npmjs.com/package/ms
 var expiresIn = "1h";

// Using callbacks (NodeJS or Web Browser)
kuzzle.login("local", {username: "username", password: "password"}, expiresIn, function (err, res) {
  // ...
});

// Using promises (NodeJS only)
kuzzle.loginPromise("local", {username: "username", password: "password"}, expiresIn)
  .then(res => {
    // ...
  });
```

```java
JSONObject credentials = new JSONObject()
  .put("username", "John Doe")
  .put("password", "my secret password");

kuzzle.login("local", credentials, 30000, new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject result) {
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

// Expiration time is expressed as a string following the
// time conversion library: https://www.npmjs.com/package/ms
$expiresIn = "1h";

try {
  $result = $kuzzle->login('local', [
    'username' => 'myusername',
    'password' => 'secret'
  ], $expiresIn);

  // ...
}
catch (ErrorException $e) {
  // Handle error
}
```

Login a user using a specified strategy and their credentials.

If the Kuzzle Backend response contains a JWT Token, the Kuzzle SDK token is set and the `loginAttempt` event is fired immediately with the following object:
`{ success: true }`
This is the case, for instance, with the `local` authentication strategy.

If the request succeeds but there is no token, then it means that the chosen strategy is a two-steps authentication method, such as the OAUTH strategy. In that case, the `loginAttempt` event is **not** fired. To complete the login, the `setJwt` method must be called either with a token or with an appropriate Kuzzle Backend response.

If the login attempt fails, the `loginAttempt` event is fired with the following response:  
`{ success: false, error: 'error message' }`

<aside class="notice">
This method is non-queuable, meaning that during offline mode, it will be discarded and the callback will be called with an error. <a href="{{ site_base_path }}guide/essentials/user-authentication/#perform-a-basic-login">Learn more.</a>
</aside>

---

## login(strategy, [credentials], [expiresIn], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``strategy`` | string | Authentication strategy (local, facebook, github, ...) |
| ``credentials`` | JSON object | Optional login credentials, depending on the strategy |
| ``expiresIn`` | \<varies\> | Login expiration time |
| ``callback`` | function | Optional callback handling the response |

**Note:** If the ``expiresIn`` argument is not set, the default token expiration value will be taken from the Kuzzle server configuration.

By default, Kuzzle Backend comes with the [kuzzle-plugin-auth-passport-local](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local) plugin, which provides the `local` authentication strategy.
This strategy requires a `username` and `password` as `credentials`

---

## Callback Response

Returns a JSON object containing the Kuzzle Backend response.
