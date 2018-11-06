---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: lrange
---

# lrange

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_lrange/&lt;key&gt;?start=&lt;start&gt;&stop=&lt;stop&gt;</code>  
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
  "action": "lrange",
  "_id": "<key>",
  "start": "<start>",
  "stop": "<stop>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "lrange",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "value1",
    "value2",
    "..."
  ]
}
```

Returns the list elements between the `start` and `stop` positions.

[[_Redis documentation_]](https://redis.io/commands/lrange)
