---
layout: full.html
algolia: true
title: Kuzzle response
description: understand Kuzzle response mechanisms
order: 300
---

# Kuzzle response

A `response` is the result of a query you send to Kuzzle.
It may be the results of a search query, an acknowledgement of a created action, and so on.
When you subscribe to a room, Kuzzle also sends a notification to your application in the form of a `response` object.

A `response` is a JSON object as shown in the sample pane.

_NB: For more details about status code and error object, see status-codes.md_

## Example

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

  // For notification only, completion state of the request.
  // A pending request will receive a "done" notification once it is processed by Kuzzle.
  "state": "<done|pending>",

  // For notifications only, indicates if the document is added or removed from the subscription.
  "scope": "<in|out>",

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
