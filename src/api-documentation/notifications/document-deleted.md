---
layout: full.html
algolia: true
title: A document has been deleted
order: 500
---

# A document has been deleted

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "delete",
  "state": "done",   // The document has been fully deleted
  "scope": "out", // The document left your room scope
  "volatile": {
    // volatile embedded in the request
  },
  "requestId": "<unique request identifier>",
  "result": {// The updated document
    "_id": "<documentId>",
    ...
  }
}
```
