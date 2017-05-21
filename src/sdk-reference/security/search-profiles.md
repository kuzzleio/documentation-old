---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: searchProfiles
---

# searchProfiles

```js
var filters = {
   // filter can contains an array `roles` with a list of role id
  policies:  ['myrole', 'admin'],
  // filter can handler pagination with properties `from` and `size`
  from: 0,
  size: 10
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .searchProfiles(filters, function(error, result) {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<Profile object>, <Profile object>, ...]
    // }
  });

// Using promises (NodeJS)
kuzzle
  .security
  .searchProfilesPromise(filters)
  .then((result) => {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<Profile object>, <Profile object>, ...]
    // }
  });
```

```java
JSONObject filters = new JSONObject()
  // filter can contains a "roles" array with a list of role IDs
  .put("policies", new JSONArray().put("myrole", "admin"))
  // search results can be paginated
  .put("from", 0)
  .put("size", 10);

kuzzle
  .security
  .searchProfiles(filters, new ResponseListener<SecurityDocumentList>() {
    @Override
    public void onSuccess(SecurityDocumentList profiles) {
      // Contains a profiles list
      for(Profile profile : profiles.getDocuments()) {

      }

      // And the total number of profiles, regardless of pagination
      profiles.getTotal();
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
use \Kuzzle\Util\ProfilesSearchResult;

$filters = [
  'policies' => [
      'admin',
      'myrole'
  ]
];

$options = [
  'from' => 0,
  'size' => 1
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $result = $security->searchProfiles($filters, $options);

  // $result instanceof ProfilesSearchResult
  foreach($result->getProfiles() as $profile) {
    // $profile instanceof Profile
  }
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{
  "total": 124,
  "documents": [
    // array of Profile objects
  ]
}
```

Executes a search on profiles according to a filter

---

## searchProfiles(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | List of filters to retrieves roles |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Starting offset | ``0`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``size`` | integer | Number of hits to return | ``20`` |

---

## Options

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``roles`` | array | Contains an array `roles` with a list of role id | ``undefined`` |

---

## Callback response

Resolves to a JSON Object containing the number of found profiles and an array of [Profile]({{ site_base_path }}sdk-reference/profile) objects.
