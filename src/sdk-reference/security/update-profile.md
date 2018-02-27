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
var policies = [
  {roleId: 'myrole'},
  {
    roleId: 'default', 
    restrictedTo: [
      {index: 'index1'}, 
      {index: 'index2', collections: ['foo', 'bar'] } 
    ] 
  }
];

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .updateProfile("profile ID", policies, function (err, updatedProfile) {
    
  });

// Using promises (NodeJS)
kuzzle
  .security
  .updateProfilePromise("profile ID", policies)
  .then(updatedProfile => {
    
  });
```

```java
JSONObject[] policies = new JSONObject[]{
  new JSONObject().put("roleId", "myrole"),
  new JSONObject()
    .put("roleId", "default")
    .put("restrictedTo", new JSONArray()
      .put(new JSONObject().put("index", "index1"))
      .put(new JSONObject()
        .put("index", "index2")
        .put("collections", new JSONArray().put("foo").put("bar"))
      )
    )
};

kuzzle
  .security
  .updateProfile("profile ID", policies, new ResponseListener<Profile>() {
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
$policies = [
  [
    'roleId' => 'myRole'
  ],
  [
    'roleId' => 'anonymous',
    'restrictedTo' => [
      ['index' => 'my-second-index', 'collection' => ['my-collection']]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $profile = $security->updateProfile($profileId, $policies);

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
| ``policies`` | array of objects| List of policies to apply to this profile |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | (Optional) Callback handling the response |

---

## Options

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle Backend will wait for the persistence layer to finish indexing (available with Elasticsearch 5.x and above) | ``undefined`` |

---

## Return Value

Returns the `Security` object to allow chaining.

---

## Callback Response

Return an updated [Profile]({{ site_base_path }}sdk-reference/profile) object.
