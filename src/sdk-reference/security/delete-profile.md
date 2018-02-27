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
There is a small delay between the time a profile is deleted and it being reflected in the search layer (usually a couple of seconds).
That means that a profile that was just deleted may still be returned by the <code>searchProfiles</code> function at first.
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
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle Backend will wait the persistence layer to finish indexing (available with Elasticsearch 5.x and above) | ``undefined`` |


---

## Return Value

Returns the `Security` object to allow chaining.

---

## Callback Response

Returns the ID of the security profile that has been deleted.
