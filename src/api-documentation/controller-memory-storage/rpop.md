---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: rpop
---

# rpop

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_rpop/<key>`  
</br><b>Method:</b> `POST`
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
  "action": "rpop",
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
  "action": "rpop",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<removed element value>"
}
```

Removes the last element of a list and returns it.

[[_Redis documentation_]](https://redis.io/commands/rpop)
