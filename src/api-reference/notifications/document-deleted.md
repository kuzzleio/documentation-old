---
layout: full.html
algolia: true
title: A document has been deleted
order: 5
---

# A document has been deleted

```javascript
{
  "status": 200,                        // Assuming everything went well
  "error": null,                        // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "delete",
  "state": "done",                     // The document has been fully deleted
  "scope": "out",                      // The document left your room scope
  "volatile": {
    // volatile embedded in the request
  },
  "requestId": "<unique request identifier>",
  "result": {                          // The updated document
    "_id": "<documentId>",
    ...
  }
}
```
