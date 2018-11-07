---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hset
---

# hset

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_hset/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "field": "<field name>",
  "value": "<field value>"
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
  "action": "hset",
  "_id": "<key>",
  "body": {
    "field": "<field name>",
    "value": "<field value>"
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
  "action": "hset",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Sets a field and its value in a hash. If the key does not exist, a new key holding a hash is created. If the field already exists, its value is overwritten.

[[_Redis documentation_]](https://redis.io/commands/hset)
