---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: lpop
---

# lpop



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_lpop/<key>`  
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
  "action": "lpop",
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
  "action": "lpop",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<removed value>"
}
```

Removes and returns the first element of a list.

[[_Redis documentation_]](https://redis.io/commands/lpop)
