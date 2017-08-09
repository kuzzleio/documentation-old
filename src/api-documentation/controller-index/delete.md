---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: delete
---

# delete


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>`  
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
  "controller": "index",
  "action": "delete"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "controller": "index",
  "action": "delete",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  }
}
```

Deletes an entire `index` from Kuzzle's persistent storage layer.
