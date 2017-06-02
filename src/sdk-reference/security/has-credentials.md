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
kuzzle.hasCredentials('local', 'kuid', function (error, result) {
});

// Using promises (node.js)
kuzzle
  .hasCredentialsPromise('local', 'kuid')
  .then(result => {
    console.log(result);   // true or false
  });
```

```java
kuzzle.hasCredentials("local", "kuid", new ResponseListener<Boolean>() {
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
$result = $kuzzle->hasCredentials('local', 'kuid');

// $result = true or false
```

Checks if a user has credentials associated with the provided strategy.

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

Resolves to a boolean value.

