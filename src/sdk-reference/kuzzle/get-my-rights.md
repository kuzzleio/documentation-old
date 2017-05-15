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
  .getMyRights(function(error, result) {
    // result is a JSON object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .getMyRightsPromise()
  .then((result) => {
    // result is a JSON object
  });
```

```java

kuzzle
  .security
  .getMyRights(new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject rights) {
        // result is a JSON object
    }

    @Override
    public void onError(JSONObject error) {
        // Handle error
    }
  });
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$result = $kuzzle->security()->getMyRights();

// $result is an array
```

> Callback response example:

```js
[
  {
    controller: 'my-controller', action: 'my-action', index: '*', collection: '*',
    value: 'allowed'
  },
  {
    controller: 'another-controller', action: '*', index: 'my-index', collection: '*',
    value: 'conditional'
  }
]
```

Gets the rights of the current user

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
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves to a `JSON` object.
