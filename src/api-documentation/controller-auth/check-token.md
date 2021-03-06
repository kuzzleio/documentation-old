---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: checkToken
---

# checkToken

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
  <b>URL:</b> <code>http://kuzzle:7512/_checkToken</code>  
<br>  <b>Method:</b> <code>POST</code>  
<br>  <b>Body:</b>  
</p>
</blockquote>


```js
{
  "token": "..."
}
```

<blockquote class="json">
<p>
  <b>Query</b>
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
    "valid": <boolean>,

    // if "valid" is false, contains the reason why the provided token is
    // invalid.
    // This field is not present if "valid" is true.
    "state": "Error message",

    // if "valid" is true, contains the expiration timestamp.
    // This field is not present if "valid" is false.
    "expiresAt": <timestamp>
  }
}
```

Checks a JWT Token's validity.
This API route does not require the caller to be logged in.
