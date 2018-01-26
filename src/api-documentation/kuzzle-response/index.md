---
layout: full.html
algolia: true
title: Kuzzle Backend Response
description: understanding the Kuzzle Backend response mechanisms
order: 300
---

# Kuzzle Backend Response

A `response` is the result of a query you send to Kuzzle Backend.
It may be the result of a search query, an acknowledgement to a create action, etc...
When you subscribe to a room, Kuzzle Backend also sends a notification to your application in the form of a `response` object.

A `response` is a JSON object with following format:


```javascript
{
  // Integer containing the status code (HTTP-like: 200 if OK, 4xx or 5xx in case of error)
  "status": 200,

  // Complex object containing error information, if something went wrong (null if OK)
  "error": {...},

  // Some information about the initial request
  "index": "<index>",
  "collection": "<collection>",
  "controller": "<controller>",
  "action": "<action>",

  // Arbitrary data repeated from the initial request (optional).
  "volatile": { foo: "bar" },

  // Your query unique identifier.
  "requestId": "<unique request identifier>",

  // Complex object, depending on your query
  "result": {
    ...
  }
}
```

_NB: For more details about status code and error object, see status-codes.md_

