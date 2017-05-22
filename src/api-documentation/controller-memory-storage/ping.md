---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: ping
---

# ping




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_ping`  
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
  "controller": "ms",
  "action": "ping"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "ping",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "PONG"
}
```

Pings the memory storage database.

[[_Redis documentation_]](https://redis.io/commands/ping)
