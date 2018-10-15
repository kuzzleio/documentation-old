---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zrevrangebyscore
---

# zrevrangebyscore

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_zrevrangebyscore/<key>?min=<min interval>&max=<max interval>[&limit=offset,count][&options=withscores]`  
</br><b>Method:</b> `GET`
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
  "action": "zrevrangebyscore",
  "_id": "<key>",
  "min": "<min interval>",
  "max": "<max interval>",

  "limit": ["<offset>", "<count>"],
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
  "action": "zrevrangebyscore",
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

Identical to [zrangebyscore]({{ site_base_path }}api-documentation/controller-memory-storage/zrangebyscore) except that the sorted set is traversed in descending order.

[[_Redis documentation_]](https://redis.io/commands/zrevrangebyscore)
