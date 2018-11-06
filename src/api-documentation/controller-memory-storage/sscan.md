---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sscan
---

# sscan

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_sscan/&lt;key&gt;?cursor=&lt;cursor&gt;[&match=&lt;pattern&gt;][&count=&lt;count&gt;]</code>  
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
  "action": "sscan",
  "_id": "<key>",
  "cursor": "<cursor>",

  "match": "<pattern>",
  "count": "<count>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sscan",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "<new cursor position>",
    [
      "member1",
      "member2",
      "..."
    ]
  ]
}
```

Identical to [scan]({{ site_base_path }}api-documentation/controller-memory-storage/scan) but iterates members contained in a set of unique values.


[[_Redis documentation_]](https://redis.io/commands/sscan)
