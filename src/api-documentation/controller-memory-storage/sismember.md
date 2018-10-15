---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sismember
---

# sismember

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_sismember/<key>/<member>`  
</br><b>Method:</b> `GET`
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "sismember",
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
  "action": "sismember",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Checks if `member` is a member of the set of unique values stored at `key`.

[[_Redis documentation_]](https://redis.io/commands/sismember)
