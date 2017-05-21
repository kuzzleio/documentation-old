---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setCredentials
---

# setCredentials

```js
user.setCredentials({
  '<strategy name>': {
    some: 'credentials'
  }
});
```

```java
JSONObject
  strategyCredentials = new JSONObject().put("some", "credentials"),
  credentials = new JSONObject().put("<strategy name>", strategyCredentials);

user.setCredentials(credentials);
```

```php
<?php

use Kuzzle\Security\User;


/*
 * @var $user User
 */

// Updating the profile with a Profile object
$user->setCredentials([
    '<strategy name>' => [
        'some' => 'credentials'
    ]
]);
```

<aside class="note">
  Updating user credentials will have no impact until the <a href="{{ site_base_path }}sdk-reference/user/create"><code>create</code></a> method is called.<br />
  The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.
</aside>

Sets the credentials associated to a user

---

## setCredentials(credentials)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``credentials`` | object | An object containing an attribute for each strategy you want to create for the user. |

---

## Return value

Returns the `User` object.
