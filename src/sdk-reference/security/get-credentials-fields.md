---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getCredentialFields
---

# getCredentialFields

```js
// Using callbacks (node.js or browser)
kuzzle.security.getCredentialFields('local', function (err, res) {
  console.log(res);     // ['username', 'kuid']
});

// Using promises (node.js)
kuzzle
  .security
  .getCredentialFields('local')
  .then(res => {
    console.log(res);   // ['username', 'kuid']
  });
```

```java
kuzzle.security.getCredentialFields("local", new ResponseListener<JSONArray>() {
  @Override
  public void onSuccess(JSONArray result) {
    // result var contains the credentials
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
$result = $kuzzle->security->getCredentialFields('local');

// $result = [username, kuid]
```

Get credential information of the specified <strategy> for the current user. 

---

## getCredentialFields(strategy, [options], callback)

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

The response is a an array reflecting the credential fields.
