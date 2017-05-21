---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: searchUsers
---

# searchUsers

```js
var filter = {
  filter: {
    and: [
      {
        terms: {
          profileIds: ['anonymous', 'default'],
        }
      },
      {
        geo_distance: {
          distance: '10km',
          pos: {
            lat: '48.8566140', lon: '2.352222'
          }
        }
      }
    ]
  }
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .searchUsers(filters, function(error, result) {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<User object>, <User object>, ...]
    // }
  });

// Using promises (NodeJS)
kuzzle
  .security
  .searchUsersPromise(filters)
  .then((result) => {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<User object>, <User object>, ...]
    // }
  });
```

```java
JSONObject filter = new JSONObject()
  .put("filter", new JSONObject()
    .put("and", new JSONArray()
      .put("terms", new JSONObject()
        .put("profileIds", new JSONArray().put("anonymous").put("default"))
      )
      .put("geo_distance", new JSONObject()
        .put("distance", "10km")
        .put("pos", new JSONObject()
          .put("lat", "48.8566140")
          .put("lon", "2.352222")
        )
      )
    )
  );

kuzzle
  .security
  .searchUsers(filters, new ResponseListener<SecurityDocumentList>() {
    @Override
    public void onSuccess(SecurityDocumentList users) {
      // users.getDocuments() returns an users list
      for(User user : users.getDocuments()) {

      }

      // users.getTotal() returns the number of matched users, regardless of pagination
      users.getTotal();
    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;
use \Kuzzle\Util\UsersSearchResult;

$filters = [
  'filter' => [
    'and' => [
      [
        'terms' => [
          'profileIds' => ['anonymous', 'default'],
        ]
      ],
      [
        'geo_distance' => [
          'distance' => '10km',
          'pos' => [
            'lat' => '48.8566140',
            'lon' => '2.352222'
          ]
        ]
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $result = $security->searchUsers($filters);

  // $result instanceof UsersSearchResult

  foreach($result->getUsers() as $user) {
    // $user instanceof User
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
    // array of User
  ]
}
```

Executes a search on users according to a filter

---

## searchUsers(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | [Filters]({{ site_base_path }}kuzzle-dsl) |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Starting offset | ``0`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``size`` | number |  Number of hits to return | ``20`` |

---

## Callback response

Resolves to a JSON Object containing the total number of found users, and an array of [User]({{ site_base_path }}sdk-reference/user) objects.
