---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zrange
---

# zrange




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zrange/<key>?start=<index start>&stop=<index stop>[&options=withscores]`  
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
  "action": "zrange",
  "_id": "<key>",
  "start": "<index start>",
  "stop": "<index stop>",

  "options": ["withscores"]
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrange",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "element1",
    "element2",
    "..."
  ]
}
```

Returns elements from a sorted set depending on their position, from a `start` position index to a `stop` position index (inclusive).

The `withscores` option includes the respective elements' scores in the result set, using the following format: `["element1 value", "element1 score", "element2 value", "element2 score", ...]`.

[[_Redis documentation_]](https://redis.io/commands/zrange)
