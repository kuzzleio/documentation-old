---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zrevrangebylex
---

# zrevrangebylex




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zrevrangebylex/<key>?min=<min interval>&max=<max interval>[&limit=offset,count]`  
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
  "action": "zrevrangebylex",
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
  "action": "zrevrangebylex",
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

Identical to [zrangebylex]({{ site_base_path }}api-documentation/controller-memory-storage/zrangebylex) except that the sorted set is traversed in descending order.

[[_Redis documentation_]](https://redis.io/commands/zrevrangebylex)
