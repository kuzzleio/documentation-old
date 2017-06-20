---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setContent
---

# setContent

```js
var user = kuzzle.security.fetchUser('myuser');
var userContent = {
  profileIds: ['profileId']
};

user = user.setContent(userContent);
```

```java
JSONObject newContent = new JSONObject()
  .put("profileIds", new JSONArray()
    .put("profileId")
  );

user.setContent(newContent);
```

```php
<?php

use Kuzzle\Security\User;

// ...

$userContent = [
  'profileIds' => ['profileId']
];

/*
 * @var $user User
 */
$user->setContent($userContent);
```

<aside class="note">
Updating an user will have no impact until the <a href="{{ site_base_path }}sdk-reference/user/create"><code>create</code></a> or <a href="{{ site_base_path }}sdk-reference/user/replace"><code>replace</code></a> method is called
</aside>

Replaces the content of User

---

## setContent(data)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``data`` | JSON Object |  User content |

---

## Return value

Returns the `User` object.
