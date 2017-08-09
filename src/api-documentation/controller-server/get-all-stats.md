---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getAllStats
---

# getAllStats


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_getAllStats`  
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
  "action": "getAllStats"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "action": "getAllStats",
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
      ...
    ]
  }
}
```

Kuzzle monitors its internal activities and make snapshots regularly. This command allows getting all the stored statistics.
By default, snapshots are made every 10s, and these snapshots are stored for 1hr.

These statistics include:

* the number of connected users per protocol for the ones which allow to get this information (websocket, udp, ...)
* the number of ongoing requests
* the number of completed requests since the last frame
* the number of failed requests since the last frame

Statistics are returned as a JSON-object with each key being the snapshot's timestamp (utc, in milliseconds).
