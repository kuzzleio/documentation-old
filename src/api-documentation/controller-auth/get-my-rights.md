---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getMyRights
---

# getMyRights

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/users/_me/_rights`  
</br><b>Method:</b> `GET`  
**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
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
Returns the rights for the user linked to the `JSON Web Token`, provided in the query or the `Authorization` header.
