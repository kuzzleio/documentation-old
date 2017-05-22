---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hstrlen
---

# hstrlen



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hstrlen/<key>/<field>`  
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
  "action": "hstrlen",
  "_id": "<key>",
  "field": "<field>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hstrlen",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<value string length>"
}
```

Returns the string length of a field's value in a hash.

[[_Redis documentation_]](https://redis.io/commands/hstrlen)
