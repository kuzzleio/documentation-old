---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: renamenx
---

# renamenx

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_renamenx/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "newkey": "<new key name>"
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
  "action": "renamenx",
  "_id": "<key>",
  "body": {
    "newkey": "<new key name>"
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
  "action": "renamenx",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Renames a key to `newkey`, only if `newkey` does not already exist.

[[_Redis documentation_]](https://redis.io/commands/renamenx)
