---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zcard
---

# zcard

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_zcard/<key>`  
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
  "action": "zcard",
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
  "action": "zcard",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of elements in the set>"
}
```

Returns the number of elements held by a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zcard)
