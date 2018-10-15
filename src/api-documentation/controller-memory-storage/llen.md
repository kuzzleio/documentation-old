---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: llen
---

# llen

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_llen/<key>`  
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
  "action": "llen",
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
  "action": "llen",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<length of the list>"
}
```

Returns the length of a list.

[[_Redis documentation_]](https://redis.io/commands/llen)
