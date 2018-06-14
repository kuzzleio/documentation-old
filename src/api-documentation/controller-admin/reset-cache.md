---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: resetCache
---

# resetCache

{{{since "1.4.0"}}}


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/admin/resetCache/<database>`  
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
  "controller": "admin",
  "action": "resetCache",

  "body": {
    "database": "internalCache"
  }
}
```

>**Response**

```javascript
{
  "requestId": "d16d5e8c-464a-4589-938f-fd84f46080b9",
  "status": 200,
  "error": null,
  "controller": "admin",
  "action": "resetCache",
  "collection": null,
  "index": null,
  "volatile": null
}
```

Clear Redis database used by Kuzzle.  

There is two Redis database that you can clear :
 - `internalCache` : Used by Kuzzle to store frequently accessed internal data
 - `memoryStorage` : Redis database usable through memoryStorage controller
