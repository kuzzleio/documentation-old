---
layout: full.html.hbs
algolia: true
title: On Document Creation
order: 100
---

# On Document Creation

Notification received when a document is created:

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
