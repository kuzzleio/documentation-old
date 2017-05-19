---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: adminExists
---

# adminExists


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

Checks if an administrator account has been created, and return a boolean as a result.
