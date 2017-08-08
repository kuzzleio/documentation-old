---
layout: side-code.html
words:  58
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

Returns the list of profile identifiers associated to this user.

---

## Return value

Returns an array of strings of associated profile identifiers
