---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: lset
---

# lset

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_lset/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "index": "<index>",
  "value": "<value>"
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
  "action": "lset",
  "_id": "<key>",
  "body": {
    "index": "<index>",
    "value": "<value>"
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
  "action": "lset",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Sets the list element at `index` with the provided value.

[[_Redis documentation_]](https://redis.io/commands/lset)
