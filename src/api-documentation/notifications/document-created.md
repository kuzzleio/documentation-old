---
layout: full.html
algolia: true
title: A document has been created
order: 200
---

# A document has been created

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "create",
  "state": "done", // The document has been fully created
  "scope": "in", // The document entered your room scope
  "volatile": {
    // volatile embedded in the request
  },
  "requestId": "<unique request identifier>",
  "result": { // The created document
    "_id": "documentId",
    "_source": {...}
  }
}
```
