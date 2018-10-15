---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteMyCredentials
---

# deleteMyCredentials

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/credentials/<strategy>/_me`  
</br><b>Method:</b> `DELETE`  
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

Delete the current user's credentials for the specified `<strategy>`. If the credentials that generated the current JWT are removed, the user will remain logged in until he logs out or his session expires, after that they will no longer be able to log in with the deleted credentials.
