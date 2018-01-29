---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: validateMyCredentials
---

# validateMyCredentials

```js
// Using callbacks (node.js or browser)
kuzzle.validateMyCredentials('local', {'username': 'foo'}, function (err, res) {
  console.log(res);     // true or false
});

// Using promises (node.js)
kuzzle
  .validateMyCredentials('local', {'username': 'foo'})
  .then(res => {
    console.log(res);   // true or false
  });
```

```java
JSONObject credentials = new JSONObject().put("username", "bar");

kuzzle.validateMyCredentials("local", credentials, new ResponseListener<Boolean>() {
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
$result = $kuzzle->validateMyCredentials('local', ['username' => 'foo']);

// $result = true or false
```

Update current user's credentials for the specified <strategy>. The credentials to send depend on the authentication plugin and the strategy.

---

## validateMyCredentials(strategy, credentials, [options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy you want to create credentials in
| `credentials` | JSON object | The credentials
| `options` | JSON object | Optional parameters
| `callback`| function | Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Make this request queuable or not  | `true`

---

## Callback Response

Returns true or false.
