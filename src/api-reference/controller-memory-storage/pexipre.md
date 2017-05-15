---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: pexpire
---

# pexpire




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_pexpire/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "milliseconds": <time to live>
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
  "action": "pexpire",
  "_id": "<key>",
  "body": {
    "milliseconds": "<time to live>"
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
  "action": "pexpire",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "[0|1]"
}
```

Sets a timeout (in milliseconds) on a key. After the timeout has expired, the key will automatically be deleted.

[[_Redis documentation_]](https://redis.io/commands/pexpire)
