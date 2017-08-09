---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: persist
---

# persist




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_persist/<key>`  
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
  "action": "persist",
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
  "action": "persist",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Removes the expiration delay or timestamp from a key, making it persistent.

[[_Redis documentation_]](https://redis.io/commands/persist)
