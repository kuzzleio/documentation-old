---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getProfileMapping
---


# getProfileMapping

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/profiles/_mapping</code>  
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
  "action": "getProfileMapping"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "controller": "security",
  "action": "getProfileMapping",
  "requestId": "<unique request identifier>",
  "result": {
    "mapping": {
      ...
    }
  }
}
```

Gets the mapping of the internal security `profiles` collection.
