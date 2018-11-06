---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: pfmerge
---

# pfmerge

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_pfmerge/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "sources": ["key1", "key2", "..."]
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
  "action": "pfmerge",
  "_id": "<key>",
  "body": {
    "sources": ["key1", "key2", "..."]
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
  "action": "pfmerge",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Merges multiple [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structures into an unique HyperLogLog structure stored at `key`, approximating the cardinality of the union of the source structures.

[[_Redis documentation_]](https://redis.io/commands/pfmerge)
