---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setJwt
---

# setJwt

```js
// Directly with a JWT Token
kuzzle.setJwt('some jwt token');

/*
 Or with a Kuzzle response.
 For instance, the final OAUTH2 response is obtained with a redirection from Kuzzle,
 and it can be provided to this method directly
 */
kuzzle.setJwt(authenticationResponse);
```

```java
// Directly with a JWT Token
kuzzle.setJwt("some jwt token");

/*
 Or with a Kuzzle response.
 For instance, the final OAUTH2 response is obtained with a redirection from Kuzzle,
 and it can be provided to this method directly.

 Here, "authenticationResponse" is an instance of JSONObject
 */
kuzzle.setJwt(authenticationResponse)
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

// Directly with a JWT Token
$kuzzle->setJwt('some jwt token');


/*
 Or with a Kuzzle response.
 For instance, the final OAUTH2 response is obtained with a redirection from Kuzzle,
 and it can be provided to this method directly
 */
 $kuzzle->setJwt($authenticationResponse);
```

Sets the internal JWT token which will be used when making requests to Kuzzle.

If the provided token is valid, a `loginAttempt` event is fired with the following object:  
`{ success: true }`

If not, the `loginAttempt` event is fired with the following response:  
`{ success: false, error: 'error message' }`

---

## setJwt(jwt)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``jwt`` | string | Previously generated JSON Web Token |

---

## setJwt(kuzzleResponse)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``kuzzleResponse`` | JSON object | Final Kuzzle response from a 2-steps authentication process |

---

## Return Value

Returns the `Kuzzle` SDK object to allow chaining.
