---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getCredentials
---

# getCredentials

```js
// Using callbacks (node.js or browser)
kuzzle.getCredentials('local', 'kuid', function (err, res) {
  console.log(res);     // {username: 'foo', kuid: '<kuid>'}
});

// Using promises (node.js)
kuzzle
  .getCredentials('local', 'kuid')
  .then(res => {
    console.log(res);   // {username: 'foo', kuid: '<kuid>'}
  });
```

```java
kuzzle.getCredentials("local", "kuid", new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject result) {
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
$result = $kuzzle->getCredentials('local', 'kuid');

// $result = [username => 'foo', kuid => '<kuid>']
```

Get credential information of the specified <strategy> for the current user. 

---

## getCredentials(strategy, kuid, [options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy you want to get credentials from
| `kuid` | string | User's kuid
| `options` | JSON object | Optional parameters
| `callback`| function | Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Mark this request as (not) queuable | `true`

---

## Callback response

The response is a an object reflecting the credentials.
