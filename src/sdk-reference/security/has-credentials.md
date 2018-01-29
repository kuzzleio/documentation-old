---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: hasCredentials
---

# hasCredentials

```js
// Using callbacks (node.js or browser)
kuzzle.security.hasCredentials('local', 'kuid', function (error, result) {

});

// Using promises (node.js)
kuzzle
  .security
  .hasCredentialsPromise('local', 'kuid')
  .then(result => {

  });
```

```java
kuzzle.security.hasCredentials("local", "kuid", new ResponseListener<Boolean>() {
  @Override
  public void onSuccess(Boolean result) {

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
$result = $kuzzle->security->hasCredentials('local', 'kuid');

// $result is a boolean
```

Checks if a user has credentials for the provided strategy.

---

## hasCredentials(strategy, kuid, [options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy to check for credentials
| `kuid` | JSON object | User's kuid
| `options` | JSON object | Optional parameters
| `callback`| function | Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Make this request queuable or not  | `true`

---

## Callback Response

Returns a boolean value.

