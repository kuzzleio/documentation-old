---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: createProfile
---

# createProfile

```js
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

// You can chose to replace the given profile if already exists
var options = {
  replaceIfExist: true
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .createProfile('myprofile', profileDefinition, options, function(error, response) {
    // result is a Profile object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .createProfilePromise('myprofile', profileDefinition, options)
  .then((response) => {
    // result is a Profile object
  });
```

```java
JSONObject role1 = new JSONObject()
  .put("roleId", "myrole");

JSONObject role2 = new JSONObject()
  .put("roleId", "default")
  .put("restrictedTo", new JSONArray()
    .put(new JSONObject().put("index", "index1"))
    .put(new JSONObject()
      .put("index", "index2")
      .put("collections",new JSONArray().put("foo").put("bar"))
    )
  );
JSONObject profileDefinition = new JSONObject()
  .put("policies", new JSONArray()
    .put(role1)
    .put(role2)
  );

Options opts = new Options().setReplaceIfExist(true);

kuzzle
  .security
  .createProfile("myprofile", profileDefinition, opts, new ResponseListener<Profile>() {
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
  $profile = $security->createProfile($profileId, $profileDefinition);

  // $profile instanceof Profile
}
catch (ErrorException $e) {

}
```

Create a new profile in Kuzzle.

<aside class="notice">
There is a small delay between profile creation and their creation in our search layer, usually a couple of seconds.
That means that a profile that was just been created will not be returned by <code>searchProfiles</code> function
</aside>

---

## createProfile(id, content, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique profile identifier |
| ``content`` | JSON Object | A plain JSON object representing the profile and credentials |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | Callback handling the response |

---

## Options

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``replaceIfExist`` | boolean | If the same profile already exists: throw an error if sets to false. Replace the existing profile otherwise | ``false`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves to a [Profile]({{ site_base_path }}sdk-reference/profile) object.
