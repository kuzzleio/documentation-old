---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: pfadd
---

# pfadd




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_pfadd/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "elements": ["element1", "element2", "..."]
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
  "action": "pfadd",
  "_id": "<key>",
  "body": {
    "elements": ["element1", "element2", "..."]
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
  "action": "pfadd",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "[0|1]"
}
```

Adds elements to an [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structure.

[[_Redis documentation_]](https://redis.io/commands/pfadd)
