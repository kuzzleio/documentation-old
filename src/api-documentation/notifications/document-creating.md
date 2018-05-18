---
layout: full.html.hbs
algolia: true
title: On Document Creation Pending 
order: 200
---

# On Document Creation Pending 

Notification received when a document is about to be created:

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "create",
  "state": "pending", // Indicates that the document will be created
  "volatile": {},
  "result": {}
}
```
