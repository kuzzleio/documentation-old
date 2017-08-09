---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: truncate
---

# truncate


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_truncate`  
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
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "truncate"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "action": "truncate",
  "controller": "collection",
  "index": "<index>",
  "collection": "<collection>",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true,
  }
}
```

Empties a collection from all its documents, while keeping any associated mapping.  
It is also faster than deleting all documents from a collection using a query.
