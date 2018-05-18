---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getProfileIds
---

# getProfileIds

```js
for (profileId of user.getProfileIds()) {

}
```

```java
String[] profileIds = user.getProfileIds();
```

```php
<?php

use Kuzzle\Security\User;

// ...

/*
 * @var $user User
 */
foreach($user->getProfileIds() as $profileId) {
  
}
```

Returns the list of profile identifiers associated with this user.

---

## Return Value

Returns an array of strings, each a profile identifier associated with this user.
