---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteMyCredentials
---

# deleteMyCredentials


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/_me`  
**Method:** `DELETE`  
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
  "action": "deleteMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>"
}
```

>**Response**

```javascript

{
  "status": 200,
  "error": null,
  "action": "deleteMyCredentials",
  "controller": "auth",
  "result": {
    "acknowledged": true
  }
}
```

Delete credentials of the specified `<strategy>` for the current user. If the credentials that generated the current JWT are removed, the user will remain logged in until he logs out or his session expires, but won't be able to log in with these credentials afterward.
