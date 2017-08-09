---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getStats
---

# getStats


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_getStats[?startTime=123456789][&stopTime=234567890]`  
**Method:** `POST`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
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

Allows to get statistics frames saved/stored after a provided timestamp (utc, in milliseconds).

These statistics include:

* the number of connected users per protocol for the ones which allow to get this information (websocket, udp, ...)
* the number of ongoing requests
* the number of completed requests since the last frame
* the number of failed requests since the last frame

Statistics are returned as a JSON-object with each key being the snapshot's timestamp (utc, in milliseconds).
