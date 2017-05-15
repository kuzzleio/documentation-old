---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: time
---

# time




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_time`  
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
