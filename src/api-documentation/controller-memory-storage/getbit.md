---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getbit
---

# getbit

{{{since "1.0.0"}}}


<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_getbit/&lt;key&gt;?offset=&lt;offset&gt;</code>  
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
  "action": "getbit",
  "_id": "<key>",
  "offset": "<offset>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "getbit",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Returns the bit value at `offset`, in the string value stored in a key.

[[_Redis documentation_]](https://redis.io/commands/getbit)
