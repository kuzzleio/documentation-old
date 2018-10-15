---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zremrangebyscore
---

# zremrangebyscore

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_zremrangebyscore/<key>`  
</br><b>Method:</b> `DELETE`  
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
<b>Query</b>
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
