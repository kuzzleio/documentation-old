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
kuzzle.security.hasCredentials('local', 'kuid', function (err, res) {
  console.log(res);     // true or false
});

// Using promises (node.js)
kuzzle
  .security
  .hasCredentials('local', 'kuid')
  .then(res => {
    console.log(res);   // true or false
  });
```

```java
kuzzle.security.hasCredentials("local", "kuid", new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject result) {
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
$result = $kuzzle->security->hasCredentials('local', 'kuid');

// $result = true or false
```

Update credentials of the specified <strategy> for the current user. The credentials to send depends entirely on the authentication plugin and strategy you want to update credentials for.

---

## hasCredentials(strategy, kuid, [options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy you want to create credentials in
| `kuid` | JSON object | User's kuid
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
