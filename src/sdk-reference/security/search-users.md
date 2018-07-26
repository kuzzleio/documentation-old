---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: searchUsers
---

# searchUsers

```js
const filter = {
  bool: {
    must: [
      {
        terms: {
          profileIds: ['anonymous', 'default']
        }
      },
      {
        geo_distance: {
          distance: '10km',
          pos: {
            lat: 48.8566140,
            lon: 2.352222
          }
        }
      }
    ]
  }
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
  .searchUsers(filters, options, function(error, result) {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found users>,
    //   users: [<User object>, <User object>, ...],
    //   scrollId: "<only if a 'scroll' parameter has been passed in the options>"
    // }
  });

// Using promises (NodeJS)
kuzzle
  .security
  .searchUsersPromise(filters, options)
  .then(result => {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found users>,
    //   users: [<User object>, <User object>, ...],
    //   scrollId: "<only if a 'scroll' parameter has been passed in the options>"
    // }
  });
```

```java
JSONObject filter = new JSONObject()
  .put("bool", new JSONObject()
    .put("must", new JSONArray()
      .put(new JSONObject()
        .put("terms", new JSONObject()
          .put("profileIds", new JSONArray().put("anonymous").put("default"))
        )
      )
      .put(new JSONObject()
        .put("geo_distance", new JSONObject()
          .put("distance", "10km")
          .put("pos", new JSONObject()
            .put("lat", 48.8566140)
            .put("lon", 2.352222)
          )
        )
      )
    )
  );

// optional: result pagination configuration
Options options = new Options();
options.setFrom((long) 0);
options.setSize((long) 42);
options.setScroll("1m");

kuzzle
  .security
  .searchUsers(filters, options, new ResponseListener<SecurityDocumentList>() {
    @Override
    public void onSuccess(SecurityDocumentList users) {
      // users.getDocuments() returns an users list
      for(User user : users.getDocuments()) {

      }

      // Total number of profiles, regardless of pagination
      long total = users.getTotal();

      // Available only if a "scroll" option has been provided
      String scrollId = users.getScroll()
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
  'bool' => [
    'must' => [
      [
        'terms' => [
          'profileIds' => ['anonymous', 'default'],
        ]
      ],
      [
        'geo_distance' => [
          'distance' => '10km',
          'pos' => [
            'lat' => 48.8566140,
            'lon' => 2.352222
          ]
        ]
      ]
    ]
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
  $result = $security->searchUsers($filters, $options);

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
  "users": [
    // array of User objects
  ],
  // only if a scroll parameter has been provided
  "scrollId": "<scroll identifier>"
}
```

Return users matching the given filter.  

---

## searchUsers(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | Filter in [Elasticsearch's Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/query-filter-context.html) format |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Starting offset | ``0`` |
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``scroll`` | string | Start a scroll session, with a time to live equals to this parameter's value following the [Elastisearch time format](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/common-options.html#time-units) | ``undefined`` |
| ``size`` | number |  Number of hits to return per result page | ``10`` |

<aside class="notice">
  To get more information about scroll sessions, please refer to the <a href="{{ site_base_path }}api-documentation/controller-document/search">API reference documentation</a>.
</aside>

---

## Callback Response

Return a JSON Object
