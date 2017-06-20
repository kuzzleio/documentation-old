---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: fetchProfile
---

# fetchProfile

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .fetchProfile('myprofile', function(error, result) {
    // result is a Profile object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .fetchProfilePromise('myprofile')
  .then((result) => {
    // result is a Profile object
  });
```

```java

kuzzle
  .security
  .fetchProfile("myprofile", new ResponseListener<Profile>() {
    @Override
    public void onSuccess(Profile profile) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Profile;

$profileId = 'myProfile';

$kuzzle = new Kuzzle('localhost');

try {
  $profile = $kuzzle->security()->fetchProfile($profileId);

  // $profile instanceof Profile
}
catch (ErrorException $e) {

}
```

Retrieves a single stored profile using its unique ID.

---

## fetchProfile(id, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique profile identifier |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves to a [Profile]({{ site_base_path }}sdk-reference/profile) object.
