---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hkeys
---

# hkeys

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_hkeys/&lt;key&gt;</code>  
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
  "action": "hkeys",
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
  "action": "hkeys",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "field1",
    "field2",
    "..."
  ]
}
```

Returns all field names contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hkeys)
