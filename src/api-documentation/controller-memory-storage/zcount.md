---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zcount
---

# zcount




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zcount/<key>?min=<min score>&max=<max score>`  
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
  "action": "zcount",
  "_id": "<key>",
  "min": "<min score>",
  "max": "<max score>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zcount",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of elements in the specified range>"
}
```

Returns the number of elements held by a sorted set with a score between the provided `min` and `max` values.

By default, the provided min and max values are inclusive. This behavior can be changed using the syntax described in the Redis [ZRANGEBYSCORE](https://redis.io/commands/zrangebyscore) documentation.

[[_Redis documentation_]](https://redis.io/commands/zcount)
