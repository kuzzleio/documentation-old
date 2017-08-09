---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: exists
---

# exists


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_exists`  
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
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "exists"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "exists",
  "requestId": "<unique request identifier>",
  "result": true
}
```

Checks if a collection exists in Kuzzle database storage layer.
