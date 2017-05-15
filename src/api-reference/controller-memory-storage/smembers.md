---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: smembers
---

# smembers




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_smembers/<key>`  
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
  "action": "smembers",
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
  "action": "smembers",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "member1",
    "member2",
    "..."
  ]
}
```

Returns the members of a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/smembers)
