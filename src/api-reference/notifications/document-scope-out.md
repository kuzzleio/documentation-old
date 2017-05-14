---
layout: full.html
algolia: true
title: An updated document left your listening scope
order: 6
---

# An updated document left your listening scope

```javascript
{
  "status": 200,                        // Assuming everything went well
  "error": null,                        // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "update",
  "state": "done",                     // The document has been fully updated
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
