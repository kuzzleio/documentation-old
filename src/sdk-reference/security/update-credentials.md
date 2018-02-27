---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: updateCredentials
---

# updateCredentials

```js
// Using callbacks (node.js or browser)
kuzzle.security.updateCredentials('local', 'kuid', {'username': 'foo'}, function (error, updatedCredentials) {

});

// Using promises (node.js)
kuzzle
  .security
  .updateCredentialsPromise('local', 'kuid', {'username': 'foo'})
  .then(updatedCredentials => {

  });
```

```java
JSONObject credentials = new JSONObject().put("username", "foo");

kuzzle.security.updateCredentials("local", "kuid", credentials, new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject updatedCredentials) {
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
}
```

```php
<?phpfound
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$updatedCredentials = $kuzzle->security->updateCredentials('local', 'kuid', ['username' => 'foo']);

```

> Callback response

```json
{
  "username": "foo",
  "kuid": "<Kuzzle Unique User Identifier>"
}
```

Update the current user's credentials for the specified <strategy>. The credentials to send depend on the authentication plugin and the strategy.

---

## updateCredentials(strategy, kuid, credentials, [options], [callback])

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy you want to create credentials in
| `kuid` | JSON object | User's kuid
| `credentials` | JSON object | The credentials
| `options` | JSON object | Optional parameters
| `callback`| function | Optional callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Make this request queuable or not  | `true`

---

## Callback Response

Returns an object with the updated credentials.
