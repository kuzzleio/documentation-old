---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: checkToken
---

# checkToken

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.checkToken(token, function (err, res) {
  // ...
});

// Using promises (NodeJS only)
kuzzle.checkTokenPromise(token)
  .then(res => {
    // ...
  });
```

```java
kuzzle.checkToken("some jwt token", new ResponseListener<TokenValidity>() {
  @Override
  public void onSuccess(TokenValidity tokenInfo) {
    if (tokenInfo.isValid()) {
      // tokenInfo.getExpiresAt() returns the expiration timestamp
    }
    else {
      // tokenInfo.getState() returns the invalidity reason
    }
  }
});
```

```php
<?php

$result = $kuzzle->checkToken('some jwt token');

/*
$result = [
  'expiresAt' => 1468257834099, //timestamp in milliseconds
  'valid' => true
];
*/
```

> Callback response if the token is valid:

```json
{
  "expiresAt": 1454588077399,
  "valid": true
}
```

> Callback response if the token is invalid:

```json
{
  "valid": false,
  "state": "<invalidity reason>"
}
```

Checks the validity of a JSON Web Token.

<aside class="notice">
This method is non-queuable, meaning that during offline mode, it will be discarded and the callback will be called with an error.
</aside>

---

## checkToken(token, callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``token``    | string   | The token to check |
| ``callback`` | function | Callback handling the response |

**Note:** this method sends an unauthenticated API call to Kuzzle, meaning it ignores the JWT Token property, even if it has been set.

---

## Callback response

A JSON object with a `valid` boolean property.  
If the token is valid, a `expiresAt` property is set with the expiration timestamp. If not, a `state` property is set explaining why the token is invalid.
