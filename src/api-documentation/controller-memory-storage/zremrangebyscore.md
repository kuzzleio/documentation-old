---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zremrangebyscore
---

# zremrangebyscore




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zremrangebyscore/<key>`  
**Method:** `DELETE`  
**Body:**
</p>
</blockquote>


```js
{
  "min": "<min interval>",
  "max": "<max interval>"
}
```



<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "zremrangebyscore",
  "_id": "<key>",
  "body": {
    "min": "<min interval>",
    "max": "<max interval>"
  }
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zremrangebyscore",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of removed members>"
}
```

Removes members from a sorted set with a score between `min` and `max`.

The `min` and `max` values are inclusive, but this behavior can be changed (see the [redis documentation](https://redis.io/commands/zrangebyscore)).

[[_Redis documentation_]](https://redis.io/commands/zremrangebylex)
