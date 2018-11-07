---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zlexcount
---

# zlexcount

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_zlexcount/&lt;key&gt;?min=&lt;min value&gt;&max=&lt;max value&gt;</code>  
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
