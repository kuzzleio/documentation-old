---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateRole
---


# updateRole



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/<roleId>/_update`  
**Method:** `PUT`  
**Body**
</p>
</blockquote>

```js
{
  "controllers": {
    "*": {
      "actions": {
        "*": true
      }
    }
  }
}
```

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "updateRole",
  "_id": "<roleId>",
  "body": {
    "controllers": {
      "*": {
        "actions": {
          "*": true
        }
      }
    }
  }
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "index": "%kuzzle",
  "collection": "roles",
  "action": "updateRole",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<roleId>",
    "_index": "%kuzzle",
    "_type": "roles",
    "_version": 2
  }
}
```

Given a `role id`, updates the matching Role object in Kuzzle's database layer.

The body content needs to match Kuzzle's role definition.

<aside class="warning">
Unlike a regular document update, this method will replace the whole role definition by the body content.<br>
In other words, you always need to provide the complete role definition in the body.
</aside>

To get some more detailed information about Kuzzle's user management model,
please refer to [Kuzzle's security documentation]({{ site_base_path }}guide/essentials/security/#permissions).
