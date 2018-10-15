---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hget
---

# hget

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_hget/<key>/<field>`  
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
  "action": "hget",
  "_id": "<key>",
  "field": "field name"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hget",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "field value"
}
```

Returns the field's value of a hash.

[[_Redis documentation_]](https://redis.io/commands/hget)
