---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zrangebylex
---

# zrangebylex

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_zrangebylex/<key>?min=<min interval>&max=<max interval>[&limit=offset,count]`  
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
  "action": "zrangebylex",
  "_id": "<key>",
  "min": "<min interval>",
  "max": "<max interval>",

  "limit": ["<offset>", "<count>"]
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrangebylex",
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

Returns elements in a sorted set where all members have equal score, using lexicographical ordering. The `min` and `max` values are inclusive by default. To change this behavior, please check the full documentation.

The optional LIMIT argument can be used to only get a range of the matching elements (similar to _SELECT LIMIT offset, count_ in SQL).

[[_Redis documentation_]](https://redis.io/commands/zrangebylex)
