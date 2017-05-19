---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: create
---

# create


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/_create`  
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
  "index": "<index>",
  "controller": "index",
  "action": "create"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "action": "create",
  "controller": "index",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  }
}
```

When creating a document or a collection, Kuzzle will automatically create a data index if needed.
But in some cases, you may want to create an empty index directly, prior to storing any document in it.

Create an `index` in Kuzzle's persistent storage layer.
