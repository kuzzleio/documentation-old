---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mget
---

# mget



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_mget?keys=key1,key2,...`  
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
  "action": "mget",
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
  "action": "mget",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "value of key1",
    "value of key2",
    "..."
  ]
}
```

Returns the values of the provided keys.

[[_Redis documentation_]](https://redis.io/commands/mget)
