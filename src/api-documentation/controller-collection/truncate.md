---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: truncate
---

# truncate

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/<index>/<collection>/_truncate`  
</br><b>Method:</b> `DELETE`
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
  "collection": "<collection>",
  "controller": "collection",
  "action": "truncate"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "action": "truncate",
  "controller": "collection",
  "index": "<index>",
  "collection": "<collection>",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true,
  }
}
```

Empties a collection by removing all its documents, while keeping any associated mapping.  
It is faster than deleting all documents from a collection.

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
- [NotFoundError]({{ site_base_path }}api-documentation/errors/#notfounderror)
