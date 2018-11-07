---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hmget
---

# hmget

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_hmget/&lt;key&gt;?fields=field1,field2,...</code>  
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
  "action": "hmget",
  "_id": "<key>",
  "fields": ["field1", "field2", "..."]
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hmget",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "field1's value",
    "field2's value",
    "...'s value"
  ]
}
```

Returns the values of the specified hash's fields.

[[_Redis documentation_]](https://redis.io/commands/hmget)
