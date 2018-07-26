---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: searchProfiles
---

# searchProfiles

```js
// optional: search only for profiles referring the listed roles
const filters = {
  roles:  ['myrole', 'admin']
};

// optional: result pagination configuration
const options = {
  from: 0,
  size: 10,
  scroll: '1m'
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .searchProfiles(filters, options, function (error, result) {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   profiles: [<Profile object>, <Profile object>, ...],
    //   scrollId: "<only if a 'scroll' parameter has been passed in the options>"
    // }
  });

// Using promises (NodeJS)
kuzzle
  .security
  .searchProfilesPromise(filters, options)
  .then(result => {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   profiles: [<Profile object>, <Profile object>, ...],
    //   scrollId: "<only if a 'scroll' parameter has been passed in the options>"
    // }
  });
```

```java
// optional: search only for profiles referring the listed roles
JSONObject filters = new JSONObject()
  .put("roles", new JSONArray().put("myrole").put("admin"));

// optional: result pagination configuration
Options options = new Options();
options.setFrom((long) 0);
options.setSize((long) 42);
options.setScroll("1m");


kuzzle
  .security
  .searchProfiles(filters, options, new ResponseListener<SecurityDocumentList>() {
    @Override
    public void onSuccess(SecurityDocumentList profiles) {
      // Contains a profiles list
      for(Profile profile : profiles.getDocuments()) {

      }

      // Total number of profiles, regardless of pagination
      long total = profiles.getTotal();

      // Available only if a "scroll" option has been provided
      String scrollId = profiles.getScroll()
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

// optional: search only for profiles referring the listed roles
$filters = [
  'roles' => [
      'admin',
      'myrole'
  ]
];

// optional: result pagination configuration
$options = [
  'from' => 0,
  'size' => 1,
  'scroll' => '1m'
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
  "profiles": [
    // array of Profile objects
  ],
  // only if a scroll parameter has been provided
  "scrollId": "<scroll identifier>"
}
```

Search for security profiles, optionally returning only those linked to the provided list of security roles.

---

## searchProfiles(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | Search query |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Starting offset | ``0`` |
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``scroll`` | string | Start a scroll session, with a time to live equals to this parameter's value following the [Elastisearch time format](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/common-options.html#time-units) | ``undefined`` |
| ``size`` | integer | Number of hits to return per page | ``10`` |

---

## Filters

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``roles`` | array | Contains an array `roles` with a list of role id | ``[]`` |

---

## Callback Response

Returns a JSON Object 
