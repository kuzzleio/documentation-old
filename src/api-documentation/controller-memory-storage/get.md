---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: get
---

# get



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/<key>`  
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
  "action": "get",
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
  "action": "get",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "value"
}
```

Returns the value of a key, or `null` if the key doesn't exist.

[[_Redis documentation_]](https://redis.io/commands/get)
