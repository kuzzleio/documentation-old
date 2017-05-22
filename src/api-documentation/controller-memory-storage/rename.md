---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: rename
---

# rename




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_rename/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "newkey": "<new key name>"
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
  "action": "rename",
  "_id": "<key>",
  "body": {
    "newkey": "<new key name>"
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
  "action": "rename",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Renames a key to `newkey`. If `newkey` already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/rename)
