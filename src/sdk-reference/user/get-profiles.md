---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getProfiles
---

# getProfiles

```js
// Using callbacks (NodeJS or Web Browser)
user
  .getProfiles(function(error, profiles) {
    // result is an array of Profile objects
  });

// Using promises (NodeJS)
user
  .getProfilesPromise()
  .then(profiles => {
    // profiles is an array of Profile objects
  });
```

```java
user.getProfiles(new ResponseListener<Profile[]>() {
  @Override
  public void onSuccess(Profile[] profiles) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\User;

// ...

/*
 * @var $user User
 */

try {
  for ($user->getProfiles() as $profile) {
    // $profile is a Profile object
  }
}
catch (ErrorException $e) {

}
```

Gets the associated [Profile]({{ site_base_path }}sdk-reference/profile) instances from the Kuzzle API, using the profile identifiers attached to this user (see [getProfileIds]({{ site_base_path }}sdk-reference/user/get-profileids))

---

## getProfiles([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---


## Callback response

Resolves to an array of [Profile]({{ site_base_path }}sdk-reference/profile) objects
