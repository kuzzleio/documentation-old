---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: save
---

# save

```js
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

var profile = kuzzle.security.profile('myprofile', profileDefinition);

// Using callbacks (NodeJS or Web Browser)
profile
  .save(function(error, result) {
    // result is a Profile object
  });

// Using promises (NodeJS)
profile
  .savePromise()
  .then(result => {
    // result is a Profile object
  });
```

```java
JSONObject policy1 = new JSONObject()
  .put("roleId", "myrole");

JSONObject policy2 = new JSONObject()
  .put("roleId", "default")
  .put("restrictedTo", new JSONArray()
    .put(new JSONObject().put("index", "index1"))
    .put(new JSONObject()
      .put("index", "index2")
      .put("collections",new JSONArray().put("foo").put("bar"))
    )
  );

JSONObject roles = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)
    .put(policy2)
  );

Profile profile = kuzzle.security.profile("myprofile", roles);

profile.save(new ResponseListener<Profile>() {
  @Override
  public void onSuccess(Profile savedProfile) {

  }

  @Overrid public void onError(JSONObject error) {

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

try {
  $profile = $profile->save();

  // $profile instanceof Profile
}
catch (ErrorException $e) {

}
```

Creates or replaces the profile in Kuzzle.

<aside class="warning">
Saving the object will return an error if the bound roles have not been previously created in Kuzzle.
</aside>

---

## save([options], [callback])

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

## Return value

Returns the `Profile` object to allow chaining.

---

## Callback response

Resolves to a `Profile` object.
