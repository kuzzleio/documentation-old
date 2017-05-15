---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zlexcount
---

# zlexcount




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zlexcount/<key>?min=<min value>&max=<max value>`  
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
  "action": "zlexcount",
  "_id": "<key>",
  "min": "<min value>",
  "max": "<max value>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zlexcount",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": <elements count>
}
```

Counts elements in a sorted set where all members have equal score, using lexicographical ordering. The `min` and `max` values are inclusive by default. To change this behavior, please check the syntax detailed in the [Redis documentation](https://redis.io/commands/zrangebylex).

[[_Redis documentation_]](https://redis.io/commands/zlexcount)
