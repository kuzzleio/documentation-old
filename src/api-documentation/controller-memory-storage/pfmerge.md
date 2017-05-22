---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: pfmerge
---

# pfmerge




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_pfmerge/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "sources": ["key1", "key2", "..."]
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
  "action": "pfmerge",
  "_id": "<key>",
  "body": {
    "sources": ["key1", "key2", "..."]
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
  "action": "pfmerge",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Merges multiple [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structures into an unique HyperLogLog structure stored at `key`, approximating the cardinality of the union of the source structures.

[[_Redis documentation_]](https://redis.io/commands/pfmerge)
