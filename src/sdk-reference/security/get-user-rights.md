---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getUserRights
---

# getUserRights

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .getUserRights('id', function(error, result) {
    // result is a JSON object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .getUserRightsPromise('id')
  .then((result) => {
    // result is a JSON object
  });
```

```java

kuzzle
  .security
  .getUserRights("id", new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject rights) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;

$kuid = 'myUser';

$kuzzle = new Kuzzle('localhost');

try {
  $rights = $kuzzle->security()->getUserRights($kuid);

}
catch (ErrorException $e) {

}
```

> Callback response example

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

Gets the rights of the currently logged user.

---

### getUserRights(id, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | String | Id of the user |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

### Callback response

Resolves to a `JSON` object.
