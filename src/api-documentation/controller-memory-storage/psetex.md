---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: psetex
---

# psetex




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_psetex/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "milliseconds": "<time to live>",
  "value": "<value to set>"
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
  "action": "psetex",
  "_id": "<key>",
  "body": {
    "milliseconds": "<time to live>",
    "value": "<value to set>"
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
  "action": "psetex",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Sets a key with the provided value, and an expiration delay expressed in milliseconds. If the key does not exist, it is created beforehand.

[[_Redis documentation_]](https://redis.io/commands/psetex)
