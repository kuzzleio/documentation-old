---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: pttl
---

# pttl




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_pttl/<key>`  
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
  "action": "pttl",
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
  "action": "pttl",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<remaining time to live, in milliseconds>"
}
```

Returns the remaining time to live of a key, in milliseconds.

[[_Redis documentation_]](https://redis.io/commands/pttl)
