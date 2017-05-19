---
layout: full.html
algolia: true
title: A user subscribed to this room
order: 700
---

# A user subscribed to this room

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "subscribe",
  "volatile": {
    // volatile embedded in the request
  },
  "requestId": "<unique request identifier>",
  "result": {
    "roomId": "<unique Kuzzle room identifier>",
    "count": "<the new user count on that room>"
  }
}
```
