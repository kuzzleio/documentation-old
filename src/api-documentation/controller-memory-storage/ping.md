---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: ping
---

# ping

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_ping</code>  
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
