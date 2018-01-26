---
layout: side-code.html
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
**URL:** `http://kuzzle:7512/_adminExists`  
**Method:** `GET`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
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
