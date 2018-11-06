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
<b>URL:</b> <code>http://kuzzle:7512/credentials/&lt;strategy&gt;/_me/_exists</code>  
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
