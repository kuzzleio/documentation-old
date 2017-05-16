---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: deleteProfile
---

# deleteProfile

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .deleteProfile('myprofile', function(error, result) {

  });

// Using promises (NodeJS)
kuzzle
  .security
  .deleteProfilePromise('myprofile')
  .then((result) => {

  });
```

```java
kuzzle
  .security
  .deleteProfile("myprofile", new ResponseListener<String>() {
    @Override
    public void onSuccess(String profileName) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;

$profileId = 'myProfile';

$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->security()->deleteProfile($profileId);
}
catch (ErrorException $e) {

}
```

> Callback response

```json
"deleted profile identifier"
```

Delete the provided profile.

<aside class="notice">
There is a small delay between profile deletion and their deletion in our search layer, usually a couple of seconds.
That means that a profile that was just been delete will be returned by <code>searchProfiles</code> function
</aside>

---

## deleteProfile(id, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique profile identifier to delete |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |


---

## Return value

Returns the `Security` object to allow chaining.

---

## Callback response

Resolves the profile id which has been deleted.
