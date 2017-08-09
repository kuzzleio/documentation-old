---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getRoleMapping
---


# getRoleMapping



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/_mapping`  
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
  "action": "getRoleMapping"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "controller": "security",
  "action": "getRoleMapping",
  "requestId": "<unique request identifier>",
  "result": {
    "mapping": {
      ...
    }
  }
}
```

Gets the mapping of the internal `roles` collection.
