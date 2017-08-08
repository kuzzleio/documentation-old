---
layout: side-code.html
words:  68
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: logout
---

# logout

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_logout`  
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
