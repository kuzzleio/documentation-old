---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sismember
---

# sismember




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_sismember/<key>/<member>`  
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
  "action": "sismember",
  "_id": "<key>",
  "member": "<member>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sismember",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "[0|1]"
}
```

Checks if `member` is a member of the set of unique values stored at `key`.

[[_Redis documentation_]](https://redis.io/commands/sismember)
