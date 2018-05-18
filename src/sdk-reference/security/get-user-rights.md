---
layout: side-code.html.hbs
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

  });reflecting

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

Given a Kuzzle user id (`kuid`), retrieves the list of permissions granted to that user.

---

### getUserRights(id, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``kuid`` | String | [Kuzzle User Unique Identifier]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid) |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

### Callback Response

Returns an array of objects.

