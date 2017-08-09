---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: setnx
---

# setnx




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_setnx/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "value": "<value>"
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
  "action": "setnx",
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
  "action": "setnx",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "[0|1]"
}
```

Sets a value on a key, only if it does not already exist.

[[_Redis documentation_]](https://redis.io/commands/setnx)
