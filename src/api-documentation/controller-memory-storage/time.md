---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: time
---

# time

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_time</code>  
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
  "action": "time"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "time",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "<Epoch time>",
    "<microseconds>"
  ]
}
```

Returns the current server time as a two items list: a timestamp in [Epoch time](https://en.wikipedia.org/wiki/Unix_time) and the number of microseconds already elapsed in the current second.

[[_Redis documentation_]](https://redis.io/commands/time)
