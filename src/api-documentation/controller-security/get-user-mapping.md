---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getUserMapping
---


# getUserMapping



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/_mapping`  
**Method:** `GET`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
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
