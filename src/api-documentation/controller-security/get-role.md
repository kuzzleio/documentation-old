---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getRole
---


# getRole

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/roles/&lt;role id&gt;</code>  
<br><b>Method:</b> <code>GET</code>
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
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
The `role id` is the same one you set when you create a role.
</aside>
