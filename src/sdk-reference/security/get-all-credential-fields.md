---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getAllCredentialFields
---

# getAllCredentialFields

```js
// Using callbacks (node.js or browser)
kuzzle.security.getAllCredentialFields(function (error, strategies) {
  
});

// Using promises (node.js)
kuzzle
  .security
  .getAllCredentialFieldsPromise()
  .then(strategies => {

  });
```

```java
kuzzle.security.getAllCredentialFields(new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject strategies) {

  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
}
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$strategies = $kuzzle->security->getAllCredentialFields();
```

> Callback response:

```json
{
  "local": [
    "kuid",
    "username"
  ]
}
```

Retrieve a list of accepted fields per authentication strategy.

---

## getAllCredentialFields([options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `options` | JSON object | Optional parameters
| `callback`| function | Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Mark this request as (not) queuable | `true`

---

## Callback response

The response is a an object reflecting the credentials.
