---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: lindex
---

# lindex



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_lindex/<key>/<index>`  
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
  "action": "lindex",
  "_id": "<key>",
  "index": "<index>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "lindex",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<value>"
}
```

Returns the element at the provided index in a list.

[[_Redis documentation_]](https://redis.io/commands/lindex)
