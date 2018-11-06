---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: exists
---

# exists

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_exists</code>  
<br><b>Method:</b> <code>GET</code>
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
  "action": "exists"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "exists",
  "requestId": "<unique request identifier>",
  "result": true
}
```

Checks if a collection exists in Kuzzle.

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
