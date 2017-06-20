---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sinter
---

# sinter




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_sinter?keys=key1,key2,...`  
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
  "action": "sinter",
  "keys": ["key1", "key2", "..."]
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sinter",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "intersection value1",
    "intersection value2",
    "..."
  ]
}
```

Returns the intersection of the provided sets of unique values.

[[_Redis documentation_]](https://redis.io/commands/sinter)
