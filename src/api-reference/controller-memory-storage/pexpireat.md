---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: pexpireat
---

# pexpireat




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_pexpireat/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "timestamp": "<Epoch time in milliseconds>"
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
  "action": "pexpireat",
  "_id": "<key>",
  "body": {
    "timestamp": "<Epoch time in milliseconds>"
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
  "action": "pexpireat",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "[0|1]"
}
```

Sets an expiration timestamp on a key. After the timestamp has been reached, the key will automatically be deleted.  
The `timestamp` parameter accepts an [Epoch time](https://en.wikipedia.org/wiki/Unix_time) value, in milliseconds.

[[_Redis documentation_]](https://redis.io/commands/pexpireat)
