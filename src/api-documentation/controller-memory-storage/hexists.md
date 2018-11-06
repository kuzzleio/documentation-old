---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hexists
---

# hexists

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_hexists/&lt;key&gt;/&lt;field&gt;</code>  
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
  "action": "hexists",
  "_id": "<key>",
  "field": "field name"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hexists",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Checks if a field exists in a hash.

[[_Redis documentation_]](https://redis.io/commands/hexists)
