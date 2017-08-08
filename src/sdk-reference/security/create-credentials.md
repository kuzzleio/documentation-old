---
layout: side-code.html
words:  202
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: createCredentials
---

# createCredentials

```js
// Using callbacks (node.js or browser)
kuzzle.security.createCredentials('local', 'kuid', {'username': 'foo'}, function (error, credentials) {

});

// Using promises (node.js)
kuzzle
  .security
  .createCredentialsPromise('local', 'kuid', {'username': 'foo'})
  .then(credentials => {

  });
```

```java
JSONObject credentials = new JSONObject().put("username", "bar");

kuzzle.security.createCredentials("local", "kuid", credentials, new ResponseListener<JSONObject>() {
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
$credentials = $kuzzle->security->createCredentials('local', 'kuid', ['username' => 'foo']);

```

> Callback response

```json
{
  "username": "foo",
  "kuid": "<Kuzzle Unique Identifier>"
}
```

Create credentials of the specified <strategy> for the user <kuid>.

---

## createCredentials(strategy, kuid, credentials, [options], [callback])

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy you want to create credentials in
| `kuid` | string | User's kuid
| `credentials` | JSON object | The credentials
| `options` | JSON object | Optional parameters
| `callback`| function | Optional callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Mark this request as (not) queuable | `true`

---

## Callback response

The response is a an object reflecting the created credentials.
