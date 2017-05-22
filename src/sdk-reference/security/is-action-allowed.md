---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: isActionAllowed
---

# isActionAllowed

```js
kuzzle.security.getMyRights((err, rights) => {
    if (!err) {
        // returns either "allowed", "denied" or "conditional"
        var allowed = kuzzle.security.isActionAllowed(rights, 'read', 'get', 'index1', 'collection1');
    }
});
```

```java
kuzzle.security.getMyRights(new ResponseListener<JSONArray>() {
    @Override
    public void onSuccess(JSONArray rights) {
        // Policies is an enum with the following properties:
        // allowed, denied, conditional
        Policies authorization = kuzzle.security.isActionAllowed(rights, "read", "get", "index1", "collection1");
    }

    @Override
    public void onError(JSONObject error) {
     // ...
    }
});
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Security;

$kuzzle = new Kuzzle('localhost');

try {
  $rights = $kuzzle->security()->getMyRights();

  switch ($kuzzle->security()->isActionAllowed($rights, 'read', 'get', 'index1', 'collection1')) {
    case Security::ACTION_ALLOWED:
      // code...
      break;
    case Security::ACTION_DENIED:
      // code...
      break;
    case Security::ACTION_CONDITIONAL:
      // code...
      break;
  }
}
catch (ErrorException $e) {

}
```

Tells whether an action is allowed, denied or conditional based on the rights provided as the first argument:

- `allowed` is returned when an action is authorized without condition
- `conditional` is returned when the authorization depends on a closure
- `denied` is returned when the action is forbidden

An action is defined as a couple of action and controller (mandatory), plus an index and a collection(optional).

<aside class="notice">
You can get the rights from Kuzzle by using <a href="{{ site_base_path }}sdk-reference/security/get-user-rights">`Security.getUserRights`</a> and <a href="{{ site_base_path }}sdk-reference/kuzzle/get-my-rights">`Kuzzle.getMyRights`</a>.
</aside>

---

## isActionAllowed(rights, controller, action, index, collection)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``rights`` | JSON array | Rights list |
| ``controller`` | String | The controller |
| ``action`` | String | The action |
| ``index`` | String | The index |
| ``collection`` | String | The collection |

---

## Return value

Returns either `allowed`, `denied` or `conditional`.
