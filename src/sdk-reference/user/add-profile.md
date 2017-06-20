---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: addProfile
---

# addProfile

```js
var profile = kuzzle.security.fetchProfile('myprofile', function(error, profile) {
  // Can add a profile directly with a Profile object
  user.addProfile(profile);
});

// Or by passing an id
user.addProfile('myprofile');
```

```java

// Updating the profile with a Profile object
kuzzle
  .security
  .fetchProfile("myprofile", opts, new ResponseListener<Profile>() {
    @Override
    public void onSuccess(Profile profile) {
      // Can add the profile directly with a Profile object
      user.addProfile(profile);
    }
  });

// Updating the profile with a profile ID
user.addProfile("myprofile");
```

```php
<?php

use Kuzzle\Security\Profile;
use Kuzzle\Security\User;

// ...

$profile = $kuzzle->security->fetchProfile('myProfile');

/*
 * @var $user User
 */

// Updating the profile with a Profile object
$user->addProfile($profile);

// Updating the profile with a profile ID
$user->addProfile('myProfile');
```


Replaces the profile associated to the user

<aside class="note">
Updating an user will have no impact until the <a href="{{ site_base_path }}sdk-reference/user/create"><code>create</code></a> or <a href="{{ site_base_path }}sdk-reference/user/replace"><code>replace</code></a> method is called
</aside>

---

## addProfile(profileId)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``profileId`` | string | Profile ID |

---

## addProfile(profile)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``profile`` | Profile | An instantiated [Profile]({{ site_base_path }}sdk-reference/profile) object |

---

## Return value

Returns the `User` object.
