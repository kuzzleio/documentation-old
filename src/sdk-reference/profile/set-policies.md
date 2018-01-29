---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setPolicies
---

# setPolicies

```js
policy = { "roleId": "roleId" };

// Replaces the profile policies set with the given entry.
profile.setPolicies([policy]);
```

```java
// Binding role IDs to a profile
profile.setPolicies(new String[]{"role1 ID", "role2 ID", "role3 ID"});

// Binding policies definition to a profile
profile.setPolicies(new JSONObject[]{
  new JSONObject().put('roleId', 'role1 ID'),
  new JSONObject().put('roleId', 'role2 ID'),
  new JSONObject().put('roleId', 'role3 ID')
});
```

Replaces the roles associated with this security profile.

---

## setPolicies(Array<String> policyIDs)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``policyIDs`` | array of strings | Policy IDs to add |

---

## setPolicies(Array<JSONObject> policyDefinitions)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``policyDefinitions`` | array of JSON objects | Policy definitions to add |

---

## Return Value

Returns the `Profile` object.

<aside class="note">
Updating a profile will have no impact until the <code>save</code> method is called
</aside>
