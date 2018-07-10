---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: resetDatabase
---

# resetDatabase

{{{since "1.4.0"}}}


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/admin/_resetDatabase`  
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
  "action": "resetDatabase"
}
```

>**Response**

```javascript
{
  "requestId": "d16d5e8c-464a-4589-938f-fd84f46080b9",
  "status": 200,
  "error": null,
  "controller": "admin",
  "action": "resetDatabase",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": { "acknowledge": true }
}
```

Asynchronously delete indexes created by users. This does not include Kuzzle's internal index.

This action has no impact on Kuzzle's internal index and Plugin indexes.
