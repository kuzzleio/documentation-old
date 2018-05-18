---
layout: full.html.handlebars
algolia: true
title: On Document Entering Subscription Scope
order: 550
---

# On Document Entering Subscription Scope

Notification received when a document is updated and enters a subscription scope:

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
