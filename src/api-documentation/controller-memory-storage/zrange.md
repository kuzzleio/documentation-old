---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zrange
---

# zrange

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_zrange/&lt;key&gt;?start=&lt;index start&gt;&stop=&lt;index stop&gt;[&options=withscores]</code>  
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
  "action": "zrange",
  "_id": "<key>",
  "start": "<index start>",
  "stop": "<index stop>",

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
  "action": "zrange",
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

Returns elements from a sorted set depending on their position, from a `start` position index to a `stop` position index (inclusive).

The `withscores` option includes the respective elements' scores in the result set, using the following format: `["element1 value", "element1 score", "element2 value", "element2 score", ...]`.

[[_Redis documentation_]](https://redis.io/commands/zrange)
