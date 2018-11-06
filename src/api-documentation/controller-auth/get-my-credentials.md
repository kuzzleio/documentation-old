---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getMyCredentials
---

# getMyCredentials

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/credentials/&lt;strategy&gt;/_me</code>  
<br><b>Method:</b> <code>GET</code>  
<br><b>Headers:</b> <code>Authorization: "Bearer &lt;encrypted_jwt_token&gt;"</code>
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

Returns the current user's credential information for the specified `<strategy>`. The data returned will depend on the specified strategy. The result can be an empty object.
