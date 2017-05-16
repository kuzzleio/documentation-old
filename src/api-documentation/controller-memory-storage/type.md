---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: type
---

# type




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_type/<key>`  
**Method:** `GET`
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
  "action": "type",
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
  "action": "type",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "[hash|list|string|set|zset]"
}
```

Returns the type of the value held by a key.

[[_Redis documentation_]](https://redis.io/commands/type)
