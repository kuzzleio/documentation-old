---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zcard
---

# zcard




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zcard/<key>`  
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
  "action": "zcard",
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
  "action": "zcard",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of elements in the set>"
}
```

Returns the number of elements held by a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zcard)
