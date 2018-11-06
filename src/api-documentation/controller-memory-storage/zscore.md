---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zscore
---

# zscore

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_zscore/&lt;key&gt;/&lt;member&gt;</code>  
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
  "action": "zscore",
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
  "action": "zscore",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": <score>
}
```

Returns the score of an element in a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zscore)
