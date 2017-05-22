---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteCredentials
---


# deleteCredentials



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>`  
**Method:** `DELETE`  
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "deleteCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "action": "deleteCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": {
    "acknowledged": true
  }
}
```

Delete credentials of the specified `<strategy>` for the user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid) .
