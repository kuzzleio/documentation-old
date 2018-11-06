---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: smove
---

# smove

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_smove/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "destination": "<destination key>",
  "member": "<member>"
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
  "action": "smove",
  "_id": "<key>",
  "body": {
    "destination": "<destination key>",
    "member": "<member>"
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
  "action": "smove",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Moves a member from a set of unique values to another.

[[_Redis documentation_]](https://redis.io/commands/smove)
