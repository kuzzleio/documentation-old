---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: ttl
---

# ttl

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_ttl/&lt;key&gt;</code>  
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
  "action": "ttl",
  "_id": "<key>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "ttl",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<remaining time to live, in seconds>"
}
```

Returns the remaining time to live of a key, in seconds, or a negative value if the key does not exist or if it is persistent.

[[_Redis documentation_]](https://redis.io/commands/ttl)
