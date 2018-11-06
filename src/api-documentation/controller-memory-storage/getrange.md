---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getrange
---

# getrange

{{{since "1.0.0"}}}


<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_getrange/&lt;key&gt;?start=&lt;start&gt;&end=&lt;end&gt;</code>  
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
  "action": "getrange",
  "_id": "<key>",
  "start": "<start position>",
  "end": "<end position>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "getrange",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<value substring>"
}
```

Returns a substring of a key's value.

[[_Redis documentation_]](https://redis.io/commands/getrange)
