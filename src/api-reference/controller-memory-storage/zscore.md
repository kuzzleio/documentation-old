---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zscore
---

# zscore




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zscore/<key>/<member>`  
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
  "action": "zscore",
  "_id": "<key>",
  "member": "<member>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zscore",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": <score>
}
```

Returns the score of an element in a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zscore)
