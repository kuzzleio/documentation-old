---
layout: side-code.html
words:  156
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createRole
---


# createRole



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/<roleId>/_create`  
**Method:** `POST`  
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
  "action": "createRole",
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
  "result": {
    "_id": "<roleId>",
    "_index": "%kuzzle",
    "_type": "roles",
    "_version": 1,
    "created": true,
    "_source": { // your role definition
      "controllers": {
        "*": {
          "actions": {
            "*": true
          }
        }
      }
    }
  }
  "requestId": "<unique request identifier>",
  "controller": "security",
  "action": "createRole",
  "volatile": {},
}
```

Validates and stores a role in Kuzzle's persistent data storage.
**Note:** The `_id` parameter is mandatory.

The body content needs to match Kuzzle's role definition.

To get more detailed information about the expected role definition or Kuzzle's user management model,
please refer to [Kuzzle's permissions documentation]({{ site_base_path }}guide/essentials/security/#permissions).
