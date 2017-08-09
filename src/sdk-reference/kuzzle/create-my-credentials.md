---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: createMyCredentials
---

# createMyCredentials

```js
// Using callbacks (node.js or browser)
kuzzle.createMyCredentials('local', {'username': 'foo'}, function (err, res) {
  console.log(res);     // {username: 'bar', kuid: '<kuid>'}
});

// Using promises (node.js)
kuzzle
  .createMyCredentials('local', {'username': 'foo'})
  .then(res => {
    console.log(res);   // {username: 'foo', kuid: '<kuid>'}
  });
```

```java
JSONObject credentials = new JSONObject().put("username", "bar");

kuzzle.createMyCredentials("local", credentials, new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject result) {
    // result var contains the new credentials and the kuid of the user
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
$result = $kuzzle->createMyCredentials('local', ['username' => 'foo']);

// $result = [username => 'foo', kuid => '<kuid>']
```

Create credentials of the specified <strategy> for the current user. The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.

---

## createMyCredentials(strategy, credentials, [options], [callback])

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy you want to create credentials in
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
