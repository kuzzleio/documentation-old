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
**URL:** `http://kuzzle:7512/admin/_resetCache`  
**Method:** `POST`
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
  "database": "internalCache"
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
  "volatile": null,
  "result": { "acknowledge": true }
}
```

Asynchronously clear Redis database used by Kuzzle.  

There are two Redis databases that you can clear :
 - `internalCache` : Used by Kuzzle to store frequently accessed internal data
 - `memoryStorage` : Redis database usable through the [memoryStorage controller]({{ site_base_path }}api-documentation/controller-memory-storage/)
