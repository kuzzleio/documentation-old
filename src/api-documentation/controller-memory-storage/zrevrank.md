---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zrevrank
---

# zrevrank

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_zrevrank/&lt;key&gt;/&lt;member&gt;</code>  
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
  "action": "zrevrank",
  "_id": "<key>",
  "member": "<member>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrevrank",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<element's position in the sorted set>"
}
```

Returns the position of an element in a sorted set, with scores in descending order. The index returned is 0-based (the lowest score member has an index of 0).

[[_Redis documentation_]](https://redis.io/commands/zrevrank)
