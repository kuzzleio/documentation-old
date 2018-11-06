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
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/_list[?type=&lt;all|stored|realtime&gt;][&from=0][&size=42]</code>  
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

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
- [NotFoundError]({{ site_base_path }}api-documentation/errors/#notfounderror)
