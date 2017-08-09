---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hget
---

# hget



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hget/<key>/<field>`  
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
  "action": "hget",
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
  "action": "hget",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "field value"
}
```

Returns the field's value of a hash.

[[_Redis documentation_]](https://redis.io/commands/hget)
