---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: credentialsExist
---

# credentialsExist

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/_me/_exists`  
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

Check the existence of the specified `<strategy>`'s credentials for the current user.
