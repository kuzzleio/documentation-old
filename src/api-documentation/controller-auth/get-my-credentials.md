---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getMyCredentials
---

# getMyCredentials


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/_me`  
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
  "action": "getMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>"
}
```

>**Response**

```javascript
// example with a "local" authentication

{
  "status": 200,
  "error": null,
  "action": "getMyCredentials",
  "controller": "auth",
  "result": {
    "username": "MyUser",
    "kuid": "<kuid>"
  }
}
```

Get credential information of the specified `<strategy>` for the current user. Provided information completely depend of the strategy. The result can be an empty object.
