---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: expire
---


# expire



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_expire/<key>`  
**Method:** `POST`  
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
**Query**
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
  "result": "[0|1]" // success status
}
```

Sets a timeout (in seconds) on a key.  After the timeout has expired, the key will automatically be deleted.

[[_Redis documentation_]](https://redis.io/commands/expire)
