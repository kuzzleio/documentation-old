---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setContent
---

# setContent

```js
var profile = kuzzle.security.fetchProfile('myprofile');
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

profile = profile.setContent(profileDefinition);
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

JSONObject newContent = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)
    .put(policy2)
  );

profile.setContent(newRolesList);
```

```php
<?php

use Kuzzle\Security\Profile;

// ...

$profileDefinition = [
  'policies' => [
    [
      'roleId' => 'anonymous',
      'restrictedTo' => [
        ['index' => 'my-second-index', 'collection' => ['my-collection']]
      ]
    ]
  ]
];

/*
 * @var $profile Role
 */
$profile->setContent($profileDefinition);
```

Replaces the content of the `Profile` object.

<aside class="note">
Updating a profile will have no impact until the <code>save</code> method is called
</aside>

---

## setContent(data)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``data`` | JSON Object | Profile content |

---

## Return value

Returns the `Profile` object.
