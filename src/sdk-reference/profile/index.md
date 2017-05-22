---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: Profile
description: Permission profiles manipulation
show-subheader: true
subheader-title: Constructor
---

# Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 Profile objects are returned by Security.profile method:
 */
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

var profile = kuzzle.security.profile('myprofile', profileDefinition);
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
JSONObject roles = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)
    .put(policy2)
  );

Profile profile = new Profile(kuzzle.security, "profileId", roles);
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


// Using the Security factory:
$profile = $security->profile($profileId, $profileDefinition);

// Or directly with the constructor:
$profile = new Profile($security, $profileId, $profileDefinition);
```

Instantiates a new `Profile` object, representing a [profile]({{ site_base_path }}guide/essentials/security/#users-profiles-and-roles), which is a set of one or many [Role]({{ site_base_path }}sdk-reference/role) objects.

---

## Profile(Security, id, content)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``Security`` | Security | An instantiated [Security]({{ site_base_path }}sdk-reference/security) object |
| ``id`` | string | Unique profile identifier |
| ``content`` | JSON Object | Profile content |

**Note:**  this constructor won't make any call to Kuzzle.

---

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| `content` | JSON object | Raw profile content | get |
| `id` | string | Unique profile identifier | get |

---

## Return value

Returns to the `Profile` object.
