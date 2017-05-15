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
**URL:** `http://kuzzle:7512/<data>/<collection>`  
**Method:** `PUT`
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
  "action": "create"
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
  "action": "create",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  }
}
```

When creating a document, Kuzzle will automatically create a collection if needed.
But in some cases, you may want to create an empty collection directly, prior to storing any document in it.  
This method does nothing if the collection already exists.
