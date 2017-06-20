---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getLastStats
---

# getLastStats


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_getLastStats`  
**Method:** `GET`
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
  "action": "getLastStats"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "action": "getLastStats",
  "controller": "server",
  "requestId": "<unique request identifier>",
  "result": {
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
  }
}
```

Kuzzle monitors its internal activities and make snapshots regularly.
Allows to get the last stored statistics frame.
By default, snapshots are made every 10s.

These statistics include:

* the number of connected users per protocol for the ones which allow to get this information (websocket, udp, ...)
* the number of ongoing requests
* the number of completed requests since the last frame
* the number of failed requests since the last frame

Statistics are returned as a JSON-object with each key being the snapshot's timestamp (utc, in milliseconds).
