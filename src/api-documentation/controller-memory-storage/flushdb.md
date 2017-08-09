---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: flushdb
---

# flushdb



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_flushdb`  
**Method:** `POST`
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
  "action": "flushdb"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "flushdb",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": 1
}
```

Deletes all the keys of the database dedicated to client applications (the reserved space for Kuzzle is unaffected).

[[_Redis documentation_]](https://redis.io/commands/flushdb)
