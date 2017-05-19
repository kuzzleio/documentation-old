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
**URL:** `http://kuzzle:7512/<index>/_list(/<all|stored|realtime>)[?from=0][&size=42]`  
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
  "index": "<index>",
  "controller": "collection",
  "action": "list",
  "type": "<all|stored|realtime>",

  "from": 0,
  "size": 42
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "controller": "collection",
  "action": "list",
  "requestId": "<unique request identifier>",
  "result": {
    "collections": [
      {
        "name": "realtime_1", "type": "realtime"
      },
      {
        "name": "realtime_2", "type": "realtime"
      },
      {
        "name": "realtime_...", "type": "realtime"
      },
      {
        "name": "realtime_n", "type": "realtime"
      },
      {
        "name": "stored_1", "type": "stored"
      },
      {
        "name": "stored_2", "type": "stored"
      },
      {
        "name": "stored_...", "type": "stored"
      },
      {
        "name": "stored_n", "type": "stored"
      }
    ],
    "type": "all"
  }
}
```

Returns the complete list of realtime and stored data collections in requested index sorted by name in alphanumerical order.  
The `type` argument filters the returned collections. Allowed values: `all`, `stored` and `realtime` (default : `all`).  
The `from` and `size` arguments allow pagination. They are returned in the response if provided.
