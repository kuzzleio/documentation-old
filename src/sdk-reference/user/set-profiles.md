---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setProfiles
---

# setProfiles

```js
var profile = kuzzle.security.fetchProfile('myprofile', function(error, profile) {
  // Can set the profiles directly with a Profile object
  user.setProfiles([profile]);
});

// Or by passing their ids
user.setProfiles(['myprofile']);
```

```java

// Updating the profile with a Profile object
kuzzle
  .security
  .fetchProfile("myprofile", opts, new ResponseListener<Profile>() {
    @Override
    public void onSuccess(Profile profile) {

      ArrayList<Profile> profileIds = new ArrayList<Profile>();
      profileIds.add(profile);

      user.setProfiles(profileIds);

    }
  });

// Updating the profile with a profile ID
ArrayList<String> profileIds = new ArrayList<String>();
profileIds.add("myprofile");

user.setProfiles(profileIds);
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
$user->setProfiles([$profile]);

// Updating the profile with a profile ID
$user->setProfiles(['myProfile']);
```

<aside class="note">
Updating an user will have no impact until the <code>create</code> or <code>replace</code> method is called
</aside>


Replaces the profiles associated to the user

---

## setProfiles(profileIds)


| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``profileIds`` | array of strings | List of profile IDs |

---

## setProfiles(profiles)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``profiles`` | array of Profile objects | An array of instantiated [Profile]({{ site_base_path }}sdk-reference/profile) objects |

---

## Return value

Returns the `User` object.
