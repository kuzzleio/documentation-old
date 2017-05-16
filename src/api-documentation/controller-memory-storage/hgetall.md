---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hgetall
---

# hgetall



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hgetall/<key>`  
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
  "action": "hgetall",
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
  "action": "hgetall",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": {
    "field1": "value",
    "field2": "value",
    "...": "..."
  }
}
```

Returns all fields and values of a hash.

[[_Redis documentation_]](https://redis.io/commands/hgetall)
