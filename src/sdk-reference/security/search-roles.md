---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: searchRoles
---

# searchRoles

```js
var filters = {
   // filter can contains an array `controllers` with a list of controller name
  controllers:  ['read', 'write'],
  // filter can handler pagination with properties `from` and `size`
  from: 0,
  size: 10
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .searchRoles(filters, function(error, result) {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<Role object>, <Role object>, ...]
    // }
  });

// Using promises (NodeJS)
kuzzle
  .security
  .searchRolesPromise(filters)
  .then((result) => {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<Role object>, <Role object>, ...]
    // }
  });
```

```java
JSONObject filter = new JSONObject()
  .put("controllers", new JSONArray()
    .put("read")
    .put("write")
  )
  .put("from", 0)
  .put("size", 10);


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

$filters = [
  'controllers' => [
    'read',
    'write'
  ],
  'size' => 10,
  'from' => 0
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $result = $security->searchRoles($filters);

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
  "documents": [
    // array of Role
  ]
}
```

Executes a search on roles according to a filter

---

## searchRoles(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | List of filters to retrieves roles |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Filters

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``indexes`` | array | List of indexes id related to the searched role | ``undefined`` |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Starting offset | ``0`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``size`` | number |  Number of hits to return | ``20`` |

---

## Callback response

Resolves to a JSON Object containing the total number of found roles and an array of [Role]({{ site_base_path }}sdk-reference/role) objects.
