---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zrevrange
---

# zrevrange




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zrevrange/<key>?start=<index start>&stop=<index stop>[&options=withscores]`  
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
  "action": "zrevrange",
  "_id": "<key>",
  "start": "<index start>",
  "stop": "<index stop>",

  "options": ["withscores"]
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrevrange",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "...",
    "element2",
    "element1"
  ]
}
```

Identical to [zrange]({{ site_base_path }}api-documentation/controller-memory-storage/zrange), except that the sorted set is traversed in descending order.

[[_Redis documentation_]](https://redis.io/commands/zrevrange)
