---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: keys
---


# keys

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_keys/&lt;pattern&gt;</code>  
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
  "action": "keys",
  "pattern": "<pattern>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "keys",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "key1",
    "key2",
    "..."
  ]
}
```

Returns all keys matching the provided pattern.

[[_Redis documentation_]](https://redis.io/commands/keys)
