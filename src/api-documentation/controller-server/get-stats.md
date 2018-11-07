---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getStats
---

# getStats

{{{since "1.0.0"}}}


<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/_getStats[?startTime=123456789][&stopTime=234567890]</code>  
<br><b>Method:</b> <code>GET</code>
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "controller": "server",
  "action": "getStats",

  "startTime": "<timestamp>",
  "stopTime": "<timestamp>"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "action": "getStats",
  "controller": "server",
  "requestId": "<unique request identifier>",
  "result": {
    "total": 25,
    "hits": [
      {
        "completedRequests": {
          "websocket": 148,
          "http": 24,
          "mqtt": 78
        },
        "failedRequests": {
          "websocket": 3
        },
        "ongoingRequests": {
          "mqtt": 8,
          "http": 2
        }
        "connections": {
          "websocket": 13
        },
        "timestamp": "1453110641308"
      },
      {
        "etc...": "etc ..."
      }
    ]
  }
}
```

Returns statistics for snapshots made after a given timestamp (utc, in milliseconds).

These statistics include:

* the number of connected users per protocol (not available for all protocols)
* the number of ongoing requests
* the number of completed requests since the last frame
* the number of failed requests since the last frame

Statistics are returned as a JSON-object where each key is set to the snapshot's timestamp (utc, in milliseconds).
