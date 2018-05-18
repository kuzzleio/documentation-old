---
layout: side-code.html.handlebars
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteRole
---


# deleteRole

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/<roleId>[?refresh=wait_for]`  
**Method:** `DELETE`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "deleteRole",
  "refresh": "wait_for",

  "_id": "<roleId>"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "result": {
    "_id": "<roleId>"                 // The role id
  }
  "index": "%kuzzle",
  "collection": "roles"
  "action": "deleteRole",
  "controller": "security",
  "requestId": "<unique request identifier>"
}
```

Given a `role id`, deletes the corresponding role from the database.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the role's deletion to be indexed (indexed roles are available for `search`).

<aside class="notice">
The `role id` is the same one you set when you create a role.
</aside>
