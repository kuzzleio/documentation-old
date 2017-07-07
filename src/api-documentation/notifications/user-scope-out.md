---
layout: full.html
algolia: true
title: A user left this room
order: 800
---

# A user left this room

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "unsubscribe",
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
