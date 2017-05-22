---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getProfileMapping
---


# getProfileMapping



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/profiles/_mapping`  
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

Gets the mapping of the internal `profiles` collection.
