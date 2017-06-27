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
kuzzle.security.getCredentialFields('local', function (error, fields) {

});

// Using promises (node.js)
kuzzle
  .security
  .getCredentialFieldsPromise('local')
  .then(fields => {

  });
```

```java
kuzzle.security.getCredentialFields("local", new ResponseListener<String[]>() {
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
$fields = $kuzzle->security->getCredentialFields('local');

```

> Callback response:

```json
[
  "kuid",
  "username"
]
```

Get credential information of the specified `strategy`.

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
