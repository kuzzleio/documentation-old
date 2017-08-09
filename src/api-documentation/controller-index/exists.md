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
**URL:** `http://kuzzle:7512/<index>/_exists`  
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
  "controller": "index",
  "action": "exists"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "controller": "index",
  "action": "exists",
  "requestId": "<unique request identifier>",
  "result": true
}
```

Checks if the given index exists in Kuzzle storage layer.
