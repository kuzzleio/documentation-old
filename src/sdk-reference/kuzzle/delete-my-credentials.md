---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: deleteMyCredentials
---

# deleteMyCredentials

```js
// Using callbacks (node.js or browser)
kuzzle.deleteMyCredentials('local', function (err, res) {
  console.log(res);     // {acknowledged: true}
});

// Using promises (node.js)
kuzzle
  .deleteMyCredentials('local')
  .then(res => {
    console.log(res);   // {acknowledged: true}
  });
```

```java
kuzzle.deleteMyCredentials("local", new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject result) {
    // result var contains the query status
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
$result = $kuzzle->deleteMyCredentials('local');

// $result = [acknowledged => true]
```

Delete the current user's credentials for the specified `strategy`. 

---

## deleteMyCredentials(strategy, [options], [callback])

| Arguments | Type | Description
|-----------|------|------------
| `strategy` | string | Strategy you want to delete credentials from
| `options` | JSON object | Optional parameters
| `callback`| function | Optional Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Make this request queuable or not  | `true`

---

## Callback Response

Returns an object with the query status.
