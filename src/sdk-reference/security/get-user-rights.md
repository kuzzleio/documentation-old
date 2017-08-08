---
layout: side-code.html
words:  198
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
  .getUserRights('kuid', function(error, rights) {

  });

// Using promises (NodeJS)
kuzzle
  .security
  .getUserRightsPromise('kuid')
  .then(rights => {

  });
```

```java

kuzzle
  .security
  .getUserRights("kuid", new ResponseListener<JSONObject[]>() {
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

$kuid = 'myUser';

$kuzzle = new Kuzzle('localhost');

try {
  $rights = $kuzzle->security()->getUserRights($kuid);

}
catch (ErrorException $e) {

}
```

> Callback response example

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

Gets the rights of the currently logged user.

---

### getUserRights(id, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``kuid`` | String | [Kuzzle User Unique Identifier]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid) |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

### Callback response

Resolves to an array of JSON objects.

