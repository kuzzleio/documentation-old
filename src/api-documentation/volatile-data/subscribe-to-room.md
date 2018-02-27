---
layout: full.html
algolia: true
title: Subscribe to a Room
order: 200
---

# Subscribing to a Room

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
  "type": "user",
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "unsubscribe",
  "state": "done",
  "user": "out", // Tells you that a user left the room
  "volatile": { // volatile data will only be received by subscribers
    "hello": "my name is Bob"
  },
  "result": {
    "count": "<the new user count on that room>"
  }
}
```
