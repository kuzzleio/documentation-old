---
layout: side-code.html.handlebars
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

Sets the user's credentials.

<aside class="note">
  Updating user credentials will have no impact until the <a href="{{ site_base_path }}sdk-reference/user/create"><code>create</code></a> method is called.<br />
  The credentials to send depend on the authentication plugin and the strategy you want to create credentials for.
</aside>


---

## setCredentials(credentials)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``credentials`` | object | An object containing an attribute for each strategy you want to link the user to. |

---

## Return Value

Returns the `User` object.
