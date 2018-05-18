---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getMyCredentials
---

# getMyCredentials

```js
// Using callbacks (node.js or browser)
kuzzle.getMyCredentials('local', function (error, credentials) {

});

// Using promises (node.js)
kuzzle
  .getMyCredentialsPromise('local')
  .then(credentials => {

  });
```

```java
kuzzle.getMyCredentials("local", new ResponseListener<JSONObject>() {
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
$credentials = $kuzzle->getMyCredentials('local');
```

> Callback response

```json
{
  "username": "foo", 
  "kuid": "<Kuzzle Unique User Identifier>"
}
```

Get [credential information]({{ site_base_path }}guide/essentials/user-authentication/#user-credentials) for the current user.

---

## getMyCredentials(strategy, [options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy you want to get credentials from
| `options` | JSON object | Optional parameters
| `callback`| function | Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Make this request queuable or not  | `true`

---

## Callback Response

Returns an object with the credentials for the provided authentication strategy.
