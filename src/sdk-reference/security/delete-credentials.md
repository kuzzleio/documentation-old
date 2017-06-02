---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: deleteCredentials
---

# deleteCredentials

```js
// Using callbacks (node.js or browser)
kuzzle.deleteCredentials('local', 'kuid', function (error, result) {
  console.log(res);     // {acknowledged: true}
});

// Using promises (node.js)
kuzzle
  .deleteCredentialsPromise('local', 'kuid')
  .then(result => {

  });
```

```java
kuzzle.deleteCredentials("local", "kuid", new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject result) {

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
$result = $kuzzle->deleteCredentials('local', 'kuid');

```

> Callback response

```json
{
  "acknowledged": true
}
```

Delete credentials of the specified <strategy> for the current user. 
---

## deleteCredentials(strategy, kuid, [options], [callback])

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy you want to delete credentials from
| `kuid` | string | User's kuid
| `options` | JSON object | Optional parameters
| `callback`| function | Optional Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Mark this request as (not) queuable | `true`

---

## Callback response

The response is a an object reflecting the query status.
