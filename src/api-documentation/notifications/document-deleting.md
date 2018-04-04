---
layout: full.html
algolia: true
title: On Document Deletion Pending 
order: 400
---

# On Document Deletion Pending 

Notification received when a document is about to be deleted:

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "delete",
  "state": "pending", // Indicates that the document will be deleted
  "volatile": {},
  "result": {}
}
```
