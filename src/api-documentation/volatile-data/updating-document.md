---
layout: full.html.hbs
algolia: true
title: Update a Document
order: 100
---

# Updating a Document

## Given the following update query

```javascript
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "update",
  "_id": "<documentId>",
  "body": {
    "somefield": "now has a new value"
  },
  "volatile": { // notice volatile data here
    "modifiedBy": "awesome me",
    "reason": "it needed to be modified"
  }
}
```

## The following notification will be received by all subscribers:

```javascript
{
  "status": 200,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "update",
  "state": "pending",
  "scope": "unknown",
  "volatile": { // volatile data will only be received by subscribers
    "modifiedBy": "awesome me",
    "reason": "it needed to be modified"
  },
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "a document ID",
    "_source": {
      "somefield": "now has a new value",
      "someOtherField": "was left unchanged"
    }
  }
}
```
