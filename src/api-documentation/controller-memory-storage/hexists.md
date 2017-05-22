---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hexists
---

# hexists



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hexists/<key>/<field>`  
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
  "action": "hexists",
  "_id": "<key>",
  "field": "field name"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hexists",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "[0|1]"
}
```

Checks if a field exists in a hash.

[[_Redis documentation_]](https://redis.io/commands/hexists)
