---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: addPolicy
---

# addPolicy

```js
profile.addPolicy({
  'roleId': 'some role id',
  'restrictedTo': [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ]
});
```

```java
JSONObject policy = new JSONObject()
  .put("roleId", "some role id")
  .put("restrictedTo", new JSONArray()
    .put(new JSONObject().put("index", "index1"))
    .put(new JSONObject()
      .put("index", "index2")
      .put("collections", new JSONArray().put("foo").put("bar"))
    )
  );

profile.addPolicy(policy);

// you may also add a role ID directly
profile.addPolicy("some role id");
```

Adds a role to the security profile.

<aside class="note">
Updating a security profile will have no impact until the <a href="{{ site_base_path }}sdk-reference/profile/save">save</a> method is called
</aside>

---

## addPolicy(id)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique id of the new role to associate |

---

## addPolicy(policy)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``policy`` | JSON Object | policy instance corresponding to the new associated role and its restrictions |

---

## Return Value

Returns the `Profile` object to allow chaining calls.
