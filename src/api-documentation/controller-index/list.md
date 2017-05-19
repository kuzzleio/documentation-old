---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: list
---

# list


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_list`  
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
    "total": 13,
    "hits": [
      "index_1",
      "index_2",
      "index_...",
      "index_n"
    ]
  }
}
```

Returns the complete data indexes.
