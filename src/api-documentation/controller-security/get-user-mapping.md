---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getUserMapping
---


# getUserMapping

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/users/_mapping</code>  
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
  "controller": "security",
  "action": "getUserMapping"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "controller": "security",
  "action": "getUserMapping",
  "requestId": "<unique request identifier>",
  "result": {
    "mapping": {
      ...
    }
  }
}
```

Gets the mapping of the internal `users` collection.
