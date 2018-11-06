---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: list
---

# list

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/_list</code>  
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
  "controller": "index",
  "action": "list"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "controller": "index",
  "action": "list",
  "requestId": "<unique request identifier>",
  "result": {
    "indexes": [
      "index_1",
      "index_2",
      "index_...",
      "index_n"
    ]
  }
}
```

Returns the complete list of data indexes.

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
