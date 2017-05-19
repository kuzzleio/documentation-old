---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getRole
---


# getRole



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/<role id>`  
**Method:** `GET`
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
  "action": "getRole",

  "_id": "<roleId>"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "result": {
    "_id": "<roleId>",                // The role id
    "_source": {
      "controllers": {
        ...
      }
    }
  },
  "index": "%kuzzle",
  "collection": "roles"
  "action": "getRole",
  "controller": "security",
  "volatile": {},
  "requestId": "<unique request identifier>"
}
```

Given a `role id`, retrieves the corresponding role from the database.



<aside class="notice">
The role unique identifier. It's the same you set when you create a role.
in its responses when you create a role.
</aside>
