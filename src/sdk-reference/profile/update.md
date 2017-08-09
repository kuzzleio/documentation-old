---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: update
---

# update

```js
var updateContent = {
  policies: [
    {roleId: 'myrole'},
  ]
};

// Using callbacks (NodeJS or Web Browser)
profile.update(updateContent, function(err, updatedProfile) {
  // the updatedProfile variable is the updated Profile object
})

// Using promises (NodeJS)
profile
  .updatePromise(updateContent)
  .then(updatedProfile => {
    // the updatedProfile variable is the updated Profile object
  });
```

```java
JSONObject policy1 = new JSONObject().put("roleId", "myrole");

JSONObject updateContent = new JSONObject()
  .put("policies", new JSONArray().put(policy1));

profile.update(updateContent, new ResponseListener<Profile>() {
  @Override
  public void onSuccess(Profile updatedProfile) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\Profile;

// ...

/*
 * @var $profile Profile
 */
$profileContent = [
  'policies' => [
    ['roleId' => 'myrole']
  ]
];

try {
  $profile->update($profileContent);
}
catch (ErrorException $e) {

}
```

Performs a partial content update on this object.

---

## update(content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | Profile content |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns the `Profile` object to allow chaining.

---

## Callback response

Resolves to the updated version of this object
