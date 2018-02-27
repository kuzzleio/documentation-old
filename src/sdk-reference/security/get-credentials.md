---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getCredentials
---

# getCredentials

```js
// Using callbacks (node.js or browser)
kuzzle.security.getCredentials('local', 'kuid', function (error, credentials) {

});

// Using promises (node.js)
kuzzle
  .security
  .getCredentialsPromise('local', 'kuid')
  .then(credentials => {

  });
```

```java
kuzzle.security.getCredentials("local", "kuid", new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject credentials) {

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
$credentials = $kuzzle->security->getCredentials('local', 'kuid');
```

> Callback response

```json
{
  "username": "foo", 
  "kuid": "<Kuzzle User Unique Identifier>"
}
```

Get credential information of user with `kuid` for the specified `strategy`. 

---

## getCredentials(strategy, kuid, [options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy you want to get credentials from
| `kuid` | string | User's kuid
| `options` | JSON object | Optional parameters
| `callback`| function | Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Make this request queuable or not  | `true`

---

## Callback Response

The result is a an object with the credentials.
