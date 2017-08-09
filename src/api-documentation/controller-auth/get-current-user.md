---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getCurrentUser
---

# getCurrentUser


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/_me`  
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
  "action": "getCurrentUser",
  "jwt": "<encrypted_jwt_token>"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "controller": "auth",
  "action": "getCurrentUser",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>",// The kuzzle user identifier
    "_source": {
      "name": {
        "first": "Steve",
        "last": "Wozniak"
      },
      ...   // The user object content
      "profile": {
        "_id":"<profileId>",
        "roles": [
          ...  // Users roles definitions
        ]
      }
    },
    "strategies": ["available", "strategies"]
  }
}
```

Gets the user object identified by the `JSON Web Token` provided in the query or the `Authorization` header.
