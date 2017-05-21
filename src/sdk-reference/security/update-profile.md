---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: updateProfile
---

# updateProfile

```js
var newContent = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .updateProfile("profile ID", newContent, function (err, updatedProfile) {
    // "updatedProfile" is an instance of a Profile object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .updateProfilePromise("profile ID", newContent)
  .then(updatedProfile => {
    // "updatedProfile" is an instance of a Profile object
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

JSONObject newContent = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)
    .put(policy2)
  );

kuzzle
  .security
  .updateProfile("profile ID", newContent, new ResponseListener<Profile>() {
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
$profileDefinition = [
  'policies' => [
    [
      'roleId' => 'myRole'
    ],
    [
      'roleId' => 'anonymous',
      'restrictedTo' => [
        ['index' => 'my-second-index', 'collection' => ['my-collection']]
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $profile = $security->updateProfile($profileId, $profileDefinition);

  // $profile instanceof Profile
}
catch (ErrorException $e) {

}
```

Performs a partial update on an existing profile.

---

## updateProfile(id, content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier |
| ``content`` | JSON Object | A plain JSON object representing the profile |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | (Optional) Callback handling the response |

---

## Options

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns the `Security` object to allow chaining.

---

## Callback response

Resolves to an updated [Profile]({{ site_base_path }}sdk-reference/profile) object
