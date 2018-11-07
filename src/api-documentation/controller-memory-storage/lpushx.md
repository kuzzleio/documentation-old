---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: lpushx
---

# lpushx

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_lpushx/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
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
  "action": "lpushx",
  "_id": "<key>",
  "body": {
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
  "action": "lpushx",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<updated number of elements in the list>"
}
```

Prepends the specified value to a list, only if the key already exists and if it holds a list.

[[_Redis documentation_]](https://redis.io/commands/lpushx)
