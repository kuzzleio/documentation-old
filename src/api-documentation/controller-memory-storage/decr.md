---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: decr
---

# decr



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_decr/<key>`  
**Method:** `POST`  
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "decr",
  "_id": "<key>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "decr",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<updated key value>"
}
```

Decrements the number stored at `key` by 1. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/decr)
