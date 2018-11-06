---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hlen
---

# hlen

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_hlen/&lt;key&gt;</code>  
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
  "action": "hlen",
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
  "action": "hlen",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of fields contained in the hash>"
}
```

Returns the number of fields contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hlen)
