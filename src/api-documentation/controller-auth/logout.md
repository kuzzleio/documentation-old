---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: logout
---

# logout

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_logout`  
**Method:** `POST`  
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
  "action": "logout",
  "jwt": "<encrypted_jwt_token>"
}
```
>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "controller": "auth",
  "action": "logout",
  "requestId": "<unique request identifier>",
  "volatile": {},
  "result": {}
}
```

Revokes the token validity & unsubscribe from registered rooms.

The **_logout** action doesn't take strategy.
