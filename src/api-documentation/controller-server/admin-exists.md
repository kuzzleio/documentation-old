---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: adminExists
---

# adminExists

{{{since "1.0.0"}}}


<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/_adminExists</code>  
<br><b>Method:</b> <code>GET</code>
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "controller": "server",
  "action": "adminExists"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "index": "<index>",
  "action": "adminExists",
  "controller": "server",
  "requestId": "<unique request identifier>",
  "result": {
    "exists": true
  }
}
```

Checks if an administrator account has been created, return `true` if it exists and `false` if it does not.
