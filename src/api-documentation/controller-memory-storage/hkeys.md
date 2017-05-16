---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hkeys
---

# hkeys



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hkeys/<key>`  
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
  "action": "hkeys",
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
  "action": "hkeys",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "field1",
    "field2",
    "..."
  ]
}
```

Returns all field names contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hkeys)
