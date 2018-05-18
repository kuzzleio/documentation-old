---
layout: full.html.handlebars
algolia: true
title: On Document Deletion
order: 300
---

# On Document Deletion

Notification received when a document is deleted:

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
