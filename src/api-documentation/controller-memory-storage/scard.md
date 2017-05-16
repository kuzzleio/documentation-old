---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: scard
---

# scard




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_scard/<key>`  
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
  "action": "scard",
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
  "action": "scard",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of members of the set>"
}
```

Returns the number of members stored in a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/scard)
