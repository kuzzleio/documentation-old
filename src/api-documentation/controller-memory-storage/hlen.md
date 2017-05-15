---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hlen
---

# hlen



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hlen/<key>`  
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
  "action": "hlen",
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
  "action": "hlen",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of fields contained in the hash>"
}
```

Returns the number of fields contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hlen)
