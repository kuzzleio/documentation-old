---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: checkToken
---

# checkToken

<blockquote class="js">
<p>
  **URL:** `http://kuzzle:7512/_checkToken`  
  **Method:** `POST`  
  **Body:**  
</p>
</blockquote>


```js
{
  "token": "..."
}
```

<blockquote class="json">
<p>
  **Query**
</p>
</blockquote>

```json
{
  "controller": "auth",
  "action": "checkToken",
  "body": {
    "token": "..."
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "controller": "auth",
  "action": "checkToken",
  "requestId": "<unique request identifier>",
  "result": {
    "valid": "<boolean>",

    // if "valid" is false, contains the reason why the provided token is
    // invalid.
    // This field is not present if "valid" is true.
    "state": "Error message",

    // if "valid" is true, contains the expiration timestamp.
    // This field is not present if "valid" is false.
    "expiresAt": "<timestamp>"
  }
}
```

Checks a JWT Token validity.
This API route does not require to be logged in.
