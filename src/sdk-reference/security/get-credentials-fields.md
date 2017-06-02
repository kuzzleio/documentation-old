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
kuzzle.getCredentialFields('local', function (error, fields) {
});

// Using promises (node.js)
kuzzle
  .getCredentialFieldsPromise('local')
  .then(fields => {
  });
```

```java
kuzzle.getCredentialFields("local", new ResponseListener<String[]>() {
  @Override
  public void onSuccess(String[] fields) {
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
$fields = $kuzzle->getCredentialFields('local');

```

> Callback response:

```json
[
  "kuid",
  "username"
]
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
