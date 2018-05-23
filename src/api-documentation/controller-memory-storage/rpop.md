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
**URL:** `http://kuzzle:7512/ms/_rpop/<key>`  
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
