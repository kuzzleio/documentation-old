---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: dbsize
---

# dbsize



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_dbsize`  
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
  "action": "dbsize",
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "dbsize",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of keys>"
}
```

Returns the number of keys in the application database.

[[_Redis documentation_]](https://redis.io/commands/dbsize)
