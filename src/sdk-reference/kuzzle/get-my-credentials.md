---
layout: side-code.html
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
kuzzle.getMyCredentials('local', function (err, res) {
  console.log(res);     // {username: 'foo', kuid: '<kuid>'}
});

// Using promises (node.js)
kuzzle
  .getMyCredentials('local')
  .then(res => {
    console.log(res);   // {username: 'foo', kuid: '<kuid>'}
  });
```

```java
kuzzle.getMyCredentials("local", new ResponseListener<JSONObject>() {
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
$result = $kuzzle->getMyCredentials('local');

// $result = [username => 'foo', kuid => '<kuid>']
```

Get credential information of the specified <strategy> for the current user. 

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

The response is a an object reflecting the credentials.
