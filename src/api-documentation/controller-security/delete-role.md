---
layout: side-code.html.hbs
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
<b>URL:</b> <code>http://kuzzle:7512/roles/&lt;roleId&gt;[?refresh=wait_for]</code>  
<br><b>Method:</b> <code>DELETE</code>
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
