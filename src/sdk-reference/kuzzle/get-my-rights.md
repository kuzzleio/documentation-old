---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getMyRights
---

# getMyRights

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .getMyRights(function(error, rights) {
    // result is an array of objects
  });

// Using promises (NodeJS)
kuzzle
  .security
  .getMyRightsPromise()
  .then(rights => {
    // result is an array of objects
  });
```

```java

kuzzle
  .security
  .getMyRights(new ResponseListener<JSONObject[]>() {
    @Override
    public void onSuccess(JSONObject[] rights) {
    }

    @Override
    public void onError(JSONObject error) {
    }
  });
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$rights = $kuzzle->security()->getMyRights();

// $rights is an array of associative arrays
```

> Callback response

```json
[
  {
    "controller": "my-controller",
    "action": "my-action",
    "index": "*",
    "collection": "*",
    "value": "allowed"
  },
  {
    "controller": "another-controller",
    "action": "*",
    "index": "my-index",
    "collection": "*",
    "value": "conditional"
  }
]
```

Gets the rights for the current user.

---

## getMyRights([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

## Callback Response

Returns an array of rights.
