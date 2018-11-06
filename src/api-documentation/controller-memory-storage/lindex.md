---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: lindex
---

# lindex

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_lindex/&lt;key&gt;/&lt;index&gt;</code>  
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
  "action": "lindex",
  "_id": "<key>",
  "index": "<index>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "lindex",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<value>"
}
```

Returns the element at the provided index in a list.

[[_Redis documentation_]](https://redis.io/commands/lindex)
