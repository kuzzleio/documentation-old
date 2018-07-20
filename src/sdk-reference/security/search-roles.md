---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: searchRoles
---

# searchRoles

```js
// optional: retrieve only roles allowing access to the
// provided controller names
const filters = {
  controllers:  ['document']
};

  // optional result pagination configuration
  from: 0,
  size: 10

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .searchRoles(filters, function(error, result) {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found roles>,
    //   roles: [<Role object>, <Role object>, ...]
    // }
  });

// Using promises (NodeJS)
kuzzle
  .security
  .searchRolesPromise(filters)
  .then(result => {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found roles>,
    //   roles: [<Role object>, <Role object>, ...]
    // }
  });
```

```java
// optional: retrieve only roles allowing access to the
// provided controller names
JSONObject filter = new JSONObject()
  .put("controllers", new JSONArray()
    .put("document")
    .put("security")
  );

// optional: result pagination configuration
Options options = new Options();
options.setFrom((long) 0);
options.setSize((long) 42);
options.setScroll("1m");



kuzzle
  .security
  .searchRoles(filter, new ResponseListener<SecurityDocumentList>() {
    @Override
    public void onSuccess(SecurityDocumentList roles) {
      // roles.getDocuments() returns a roles list
      for(Role role : roles.getDocuments()) {

      }

      // roles.getTotal() returns the number of matched roles, regardless of pagination
      roles.getTotal();
    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Role;
use \Kuzzle\Util\RolesSearchResult;

// optional: retrieve only roles allowing access to the
// provided controller names
$filters = [
  'controllers' => [
    'document',
    'security'
  ]
];

// optional: result pagination configuration
$options = [
  'size' => 10,
  'from' => 0
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $result = $security->searchRoles($filters, $options);

  // $result instanceof RolesSearchResult

  foreach($result->getRoles() as $role) {
    // $role instanceof Role
  }
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{
  "total": 124,
  "roles": [
    // array of Role
  ]
}
```

Search for security roles, optionally returning only the roles giving access to the provided controller names.

---

## searchRoles(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | Optionally contains a "controllers" array listing the controller names used to filter searched roles |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Filters

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``controllers`` | array | retrieve only roles allowing access to the provided names | ``[]`` |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Starting offset | ``0`` |
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``size`` | number |  Number of hits to return per page | ``10`` |

---

## Callback Response

Return a JSON Object
