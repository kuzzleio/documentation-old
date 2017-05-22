---
layout: side-code.html
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
for(JSONArray policy : profile.getPolicies()) {
  // policy is a JSON object
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

Returns this profile associated role policies.

---

## Return value

An array of associated role policies
