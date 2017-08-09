---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: setex
---

# setex




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_setex/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "value": "<value>",
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
  "action": "setex",
  "_id": "<key>",
  "body": {
    "value": "<value>",
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
  "action": "setex",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Sets a value and a time to live (in seconds) on a key. If the key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/setex)
