---
layout: side-code.html
words:  168
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

Get [credential information]({{ site_base_path }}guide/essentials/user-authentication/#credentials) for the current user.

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
| `queuable` | boolean | Mark this request as (not) queuable | `true`

---

## Callback response

The response is an object reflecting the credentials for the provided authentication strategy.
