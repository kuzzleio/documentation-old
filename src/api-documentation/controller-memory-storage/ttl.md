---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: ttl
---

# ttl




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_ttl/<key>`  
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
  "action": "ttl",
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
  "action": "ttl",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<remaining time to live, in seconds>"
}
```

Returns the remaining time to live of a key, in seconds, or a negative value if the key does not exist or if it is persistent.

[[_Redis documentation_]](https://redis.io/commands/ttl)
