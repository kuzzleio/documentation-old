---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: expire
---


# expire

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_expire/<key>`  
</br><b>Method:</b> `POST`  
**Body:**
</p>
</blockquote>




```js
{
  "seconds": "<time to live>"
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
  "action": "expire",
  "_id": "<key>",
  "body": {
    "seconds": "<time to live>"
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
  "action": "expire",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1] // success status
}
```

Sets a timeout (in seconds) on a key.  After the timeout has expired, the key will automatically be deleted.

[[_Redis documentation_]](https://redis.io/commands/expire)
