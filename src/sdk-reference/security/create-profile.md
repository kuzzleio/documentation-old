---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: createProfile
---

# createProfile

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

// You can chose to replace the given profile if already exists
var options = {
  replaceIfExist: true
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .createProfile('myprofile', policies, options, function(error, profile) {

  });

// Using promises (NodeJS)
kuzzle
  .security
  .createProfilePromise('myprofile', policies, options)
  .then(profile => {

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
        .put("collections",new JSONArray().put("foo").put("bar"))
      )
    )
};

Options opts = new Options().setReplaceIfExist(true);

kuzzle
  .security
  .createProfile("myprofile", policies, opts, new ResponseListener<Profile>() {
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
  $profile = $security->createProfile($profileId, $profileDefinition);

  // $profile instanceof Profile
}
catch (ErrorException $e) {

}
```

Create a new profile in Kuzzle.

<aside class="notice">
There is a small delay between profile creation and its availability in our search layer (usually a couple of seconds).
That means that a profile that was just created might not be returned by the <code>searchProfiles</code> function at first.
</aside>

---

## createProfile(id, content, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique profile identifier |
| ``policies`` | array of JSON objects | List of policies to apply to this profile |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | Callback handling the response |

---

## Options

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``replaceIfExist`` | boolean | If the same profile already exists: throw an error if sets to false. Replace the existing profile otherwise | ``false`` |
| ``refresh`` | string | If set to ``wait_for``, Kuzzle will wait the persistence layer to finish indexing (available with Elasticsearch 5.x and above) | ``undefined`` |

---

## Callback Response

Returns a security [Profile]({{ site_base_path }}sdk-reference/profile) object.
