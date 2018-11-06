---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hincrbyfloat
---

# hincrbyfloat

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_hincrbyfloat/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "field": "field name",
  "value": "<increment value>"
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
  "action": "hincrbyfloat",
  "_id": "<key>",
  "body": {
    "field": "field name",
    "value": "<increment value>"
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
  "action": "hincrbyfloat",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<new field value>"
}
```

Increments the number stored in a hash field by the provided float value.

[[_Redis documentation_]](https://redis.io/commands/hincrbyfloat)
