---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zremrangebylex
---

# zremrangebylex

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_zremrangebylex/&lt;key&gt;</code>  
<br><b>Method:</b> <code>DELETE</code>  
<br><b>Body:</b>
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
