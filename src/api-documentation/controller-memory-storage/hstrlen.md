---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hstrlen
---

# hstrlen

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_hstrlen/&lt;key&gt;/&lt;field&gt;</code>  
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
  "action": "hstrlen",
  "_id": "<key>",
  "field": "<field>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hstrlen",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<value string length>"
}
```

Returns the string length of a field's value in a hash.

[[_Redis documentation_]](https://redis.io/commands/hstrlen)
