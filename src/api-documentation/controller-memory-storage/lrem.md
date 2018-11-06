---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: lrem
---


# lrem

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_lrem/&lt;key&gt;</code>  
<br><b>Method:</b> <code>DELETE</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "count": "<count>",
  "value": "<value to remove>"
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
  "action": "lrem",
  "_id": "<key>",
  "body": {
    "count": "<count>",
    "value": "<value to remove>"
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
  "action": "lrem",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of removed elements>"
}
```

Removes the first `count` occurences of elements equal to `value` from a list.

[[_Redis documentation_]](https://redis.io/commands/lrem)
