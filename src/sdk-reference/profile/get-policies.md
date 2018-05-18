---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getPolicies
---

# getPolicies

```js
for (policy of profile.getPolicies()) {
  // policy is a JSON object
}
```

```java
for(JSONObject policy : profile.getPolicies()) {
}
```

```php
<?php

use Kuzzle\Security\Profile;
use Kuzzle\Security\Policy;

// ...

/*
 * @var $profile Profile
 */
foreach($profile->getPolicies() as $policy) {
  // $policy instanceof Policy
}
```

> Callback response

```json
[
  {
    "roleId": "<role name1>",
    "restrictedTo": {
      "index": "<some index>",
      "collections": ["<collection1>", "<collection2>", "<...>"]
    }
  },
  {
    "roleId": "<role name2>"
  },
  {
    "roleId": "<role name3>",
    "restrictedTo": {
      "index": "<some other index>",
      "collections": ["<collection>"]
    }
  }
]
```

Returns roles associated to this security policy.

---

## Return Value

Returns an array of roles linked to this security policy.
