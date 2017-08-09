---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: Handling errors
---

# Handling errors

```js
// Any API request method behave the same way

// Using callbacks (NodeJS or Web Browser)
kuzzle.checkToken(token, function (err, res) {
  if (err) {
    console.error(err.status, ': ', err.message);
    return;
  }
});

// Using promises (NodeJS only)
kuzzle.checkTokenPromise(token)
  .then(res => {
    // ...
  })
  .catch(err => {
    console.error(err.status, ': ', err.message);
    return Promise.reject(err);
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

  @Override
  public void onError(JSONObject error) {
    System.err.println(error.getInt('status') + ': ' + error.getString('message'));
  }
});
```

```php
<?php

try {
  $result = $kuzzle->checkToken('some jwt token');
}
catch (ErrorException $e) {
  var_dump($e->status . ': ' . $e->message);
}
```

All methods taking a callback as an argument may return an error, either directly from the SDK, or as a response from Kuzzle.

All errors returned that way are JSON objects containing the following properties:

* `message`: the error message
* `status`: an error code following the [HTTP standard](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
