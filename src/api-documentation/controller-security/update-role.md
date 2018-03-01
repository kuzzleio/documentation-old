---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateRole
---


# updateRole

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/<roleId>/_update[?refresh=wait_for]`  
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
  "refresh": "wait_for",
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

Given a `role id`, updates the matching Role object in Kuzzle.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the role to be indexed (indexed roles are available for `search`).

The body content needs to match Kuzzle's role definition.

<aside class="warning">
Unlike a regular document update, this method will replace the whole role definition by the content sent in the request.<br>
In other words, you always need to provide the complete role definition in the body.
</aside>

To get some more detailed information about Kuzzle's user management model,
please refer to the [security documentation]({{ site_base_path }}guide/essentials/security/#permissions).
