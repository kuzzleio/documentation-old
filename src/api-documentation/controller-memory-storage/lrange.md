---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: lrange
---

# lrange



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_lrange/<key>?start=<start>&stop=<stop>`  
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
  "action": "lrange",
  "_id": "<key>",
  "start": "<start>",
  "stop": "<stop>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "lrange",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "value1",
    "value2",
    "..."
  ]
}
```

Returns the list elements between the `start` and `stop` positions.

[[_Redis documentation_]](https://redis.io/commands/lrange)
