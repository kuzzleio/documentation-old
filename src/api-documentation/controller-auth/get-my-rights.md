---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getMyRights
---

# getMyRights

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/_me/_rights`  
**Method:** `GET`  
**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "controller": "auth",
  "action": "getMyRights",
  "jwt": "<encrypted_jwt_token>"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "result": {
    // An array of objects containing the user rights
    "hits": [
      {
        "controller": "<ctrl_name|*>",
        "action": "<action_name|*>",
        "index": "<index_name|*>",
        "collection": "<collection_name|*>",
        "value": "<allowed|denied|conditional>"
      },
      {
   // Another rights item... and so on
      }
    ],
}
```

Gets the rights of the user identified by the `JSON Web Token` provided in the query or the `Authorization` header.
