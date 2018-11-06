---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: touch
---

# touch

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_touch</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "keys": ["key1", "key2", "..."]
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
  "action": "touch",
  "body": {
    "keys": ["key1", "key2", "..."]
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
  "action": "touch",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of touched keys>"
}
```

Alters the last access time of one or multiple keys. A key is ignored if it does not exist.

[[_Redis documentation_]](https://redis.io/commands/touch)
