---
layout: full.html
algolia: true
title: Subscribe to a room
order: 200
---

# Subscribe to a room

## Given the following subscribe query

```javascript
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "subscribe",
  "body": {
    // subscription filters
  },
  "volatile": { // notice volatile data here
    "hello": "my name is Bob"
  }
}
```

## If you leave the room, the other subscribers will receive the following notification:

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "unsubscribe",
  "state": "done",
  "scope": "out", // notice scope out, which mean that something are leaving our subscription
  "volatile": { // volatile data will only be received by subscribers
    "hello": "my name is Bob"
  },
  "requestId": "<unique request identifier>",
  "result": {
    "roomId": "<unique Kuzzle room identifier>",
    "count": "<the new user count on that room>"
  }
}
```
