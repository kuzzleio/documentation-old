---
layout: full.html
algolia: true
title: An updated document entered your listening scope
order: 300
---

# An updated document entered your listening scope

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "update",
  "state": "done", // The document has been fully updated
  "scope": "in", // The document entered your room scope
  "volatile": {
    // volatile embedded in the request
  },
  "requestId": "<unique request identifier>",
  "result": { // The updated document
    "_id": "<documentId>",
    ...
  }
}
```
