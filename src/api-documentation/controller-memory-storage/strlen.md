---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: strlen
---

# strlen




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_strlen/<key>`  
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
  "action": "strlen",
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
  "action": "strlen",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": <string length>
}
```

Returns the length of a value stored at `key`.

[[_Redis documentation_]](https://redis.io/commands/strlen)
