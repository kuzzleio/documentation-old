---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hdel
---


# hdel

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_hdel/&lt;key&gt;</code>  
<br><b>Method:</b> <code>DELETE</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "fields": ["field1", "field2", "..."]
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
  "action": "hdel",
  "_id": "<key>",
  "body": {
    "fields": ["field1", "field2", "..."]
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
  "action": "hdel",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of removed fields>"
}
```

Removes fields from a hash.

[[_Redis documentation_]](https://redis.io/commands/hdel)
