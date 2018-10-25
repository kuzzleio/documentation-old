---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: credentialsExist
---

# credentialsExist

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/credentials/<strategy>/_me/_exists`  
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
  "action": "credentialsExist",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "action": "credentialsExist",
  "controller": "auth",
  "result": true
}
```

Check that the current user has credentials for the specified `<strategy>`.
