---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: delete
---

# delete

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;</code>  
<br><b>Method:</b> <code>DELETE</code>
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "index": "<index>",
  "controller": "index",
  "action": "delete"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "controller": "index",
  "action": "delete",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  }
}
```

Deletes an entire `index` from Kuzzle.

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
- [NotFoundError]({{ site_base_path }}api-documentation/errors/#notfounderror)
