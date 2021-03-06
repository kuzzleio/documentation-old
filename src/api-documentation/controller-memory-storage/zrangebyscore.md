---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zrangebyscore
---

# zrangebyscore

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_zrangebyscore/&lt;key&gt;?min=&lt;min interval&gt;&max=&lt;max interval&gt;[&limit=offset,count][&options=withscores]</code>  
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
  "action": "zrangebyscore",
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
  "action": "zrangebyscore",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "element1",
    "element2",
    "..."
  ]
}
```

Returns all the elements in the sorted set at key with a score between `min` and `max` (inclusive). The elements are considered to be ordered from low to high scores.

The optional LIMIT argument can be used to only get a range of the matching elements (similar to _SELECT LIMIT offset, count_ in SQL).

The `withscores` option includes the respective elements' scores in the result set, using the following format: `["element1 value", "element1 score", "element2 value", "element2 score", ...]`.

[[_Redis documentation_]](https://redis.io/commands/zrangebyscore)
