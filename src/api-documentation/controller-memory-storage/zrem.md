---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zrem
---

# zrem

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_zrem/<key>`  
</br><b>Method:</b> `DELETE`  
**Body:**
</p>
</blockquote>


```js
{
  "members": ["member1", "member2", "..."]
}
```



<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "zrem",
  "_id": "<key>",
  "body": {
    "members": ["member1", "member2", "..."]
  }
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrem",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of removed members>"
}
```

Removes members from a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zrem)
