---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: pfadd
---

# pfadd

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_pfadd/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "elements": ["element1", "element2", "..."]
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
  "action": "pfadd",
  "_id": "<key>",
  "body": {
    "elements": ["element1", "element2", "..."]
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
  "action": "pfadd",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Adds elements to a [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structure.

[[_Redis documentation_]](https://redis.io/commands/pfadd)
