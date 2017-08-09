---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zremrangebylex
---

# zremrangebylex




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zremrangebylex/<key>`  
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
  "action": "zremrangebylex",
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
  "action": "zremrangebylex",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of removed members>"
}
```

Removes members from a sorted set where all elements have the same score, using lexicographical ordering. The `min` and `max` interval are inclusive, see the [Redis documentation](https://redis.io/commands/zrangebylex) to change this behavior.

[[_Redis documentation_]](https://redis.io/commands/zremrangebylex)
