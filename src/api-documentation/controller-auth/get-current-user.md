---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getCurrentUser
---

# getCurrentUser

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/users/_me`  
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
      // associated profiles
      "profileIds": ["default", "customProfile1", "customProfile2"],
      // optional: additional user information
      "name": {
        "first": "Steve",
        "last": "Wozniak"
      }
    },
    "strategies": ["available", "strategies"]
  }
}
```

Returns information about the currently logged in user.
