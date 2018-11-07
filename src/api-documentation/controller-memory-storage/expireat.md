---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: expireat
---

# expireat

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_expireat/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "timestamp": "<Epoch time>"
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
  "action": "expireat",
  "_id": "<key>",
  "body": {
    "timestamp": "<Epoch time>"
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
  "action": "expireat",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1] // success status
}
```

Sets an expiration timestamp on a key. After the timestamp has been reached, the key will automatically be deleted.  
The `timestamp` parameter accepts an [Epoch time](https://en.wikipedia.org/wiki/Unix_time) value.

[[_Redis documentation_]](https://redis.io/commands/expireat)
