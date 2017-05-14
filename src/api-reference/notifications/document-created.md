---
layout: full.html
algolia: true
title: A document has been created
order: 2
---

# A document has been created

```javascript
{
  "status": 200, // Assuming everything went well
  "error": null, // Assuming everything went well
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
