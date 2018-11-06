---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mget
---

# mget

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_mget?keys=key1,key2,...</code>  
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
  "action": "mget",
  "keys": ["key1", "key2", "..."]
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "mget",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "value of key1",
    "value of key2",
    "..."
  ]
}
```

Returns the values of the provided keys.

[[_Redis documentation_]](https://redis.io/commands/mget)
