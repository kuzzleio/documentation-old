---
layout: full.html.handlebars
algolia: true
title: A User Leaves a Room
order: 800
---

# A User Leaves a Room

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
