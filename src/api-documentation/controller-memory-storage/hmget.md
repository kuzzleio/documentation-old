---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hmget
---

# hmget



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hmget/<key>?fields=field1,field2,...`  
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
  "action": "hmget",
  "_id": "<key>",
  "fields": ["field1", "field2", "..."]
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hmget",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "field1's value",
    "field2's value",
    "...'s value"
  ]
}
```

Returns the values of the specified hash's fields.

[[_Redis documentation_]](https://redis.io/commands/hmget)
