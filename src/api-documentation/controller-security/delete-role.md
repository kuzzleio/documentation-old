---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteRole
---


# deleteRole



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/<roleId>`  
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


<aside class="notice">
The role unique identifier. It's the same you set when you create a role.
in its responses when you create a role.
</aside>
