---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: validateCredentials
---

# validateCredentials

```js
// Using callbacks (node.js or browser)
kuzzle.security.validateCredentials('local', 'kuid', {'username': 'foo'}, function (err, res) {
  console.log(res);     // true or false
});

// Using promises (node.js)
kuzzle
  .security
  .validateCredentials('local', 'kuid', {'username': 'foo'})
  .then(res => {
    console.log(res);   // true or false
  });
```

```java
JSONObject credentials = new JSONObject().put("username", "bar");

kuzzle.security.validateCredentials("local", "kuid", credentials, new ResponseListener<Boolean>() {
  @Override
  public void onSuccess(Boolean result) {
    // result var contains either true or false
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
$result = $kuzzle->security->validateCredentials('local', 'kuid', ['username' => 'foo']);

// $result = true or false
```

Validate credentials of the specified <strategy> for the user <kuid>.

---

## validateCredentials(strategy, credentials, [options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy you want to create credentials in
| `kuid` | JSON object | User's kuid
| `credentials` | JSON object | The credentials
| `options` | JSON object | Optional parameters
| `callback`| function | Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Mark this request as (not) queuable | `true`

---

## Callback response

The response is either true or false.
