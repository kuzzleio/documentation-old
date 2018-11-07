---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: linsert
---

# linsert

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_linsert/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "position": "[before|after]",
  "pivot": "<pivot value>",
  "value": "<value to insert>"
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
  "action": "linsert",
  "_id": "<key>",
  "body": {
    "position": "[before|after]",
    "pivot": "<pivot value>",
    "value": "<value to insert>"
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
  "action": "linsert",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<updated number of items in the list>"
}
```

Inserts a value in a list, either before or after the reference pivot value.

[[_Redis documentation_]](https://redis.io/commands/linsert)
