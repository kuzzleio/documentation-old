---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: shutdown
---

# shutdown

{{{since "1.4.0"}}}


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/admin/shutdown`  
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
  "controller": "admin",
  "action": "shutdown"
}
```

>**Response**

```javascript
{
  "requestId": "d16d5e8c-464a-4589-938f-fd84f46080b9",
  "status": 200,
  "error": null,
  "controller": "admin",
  "action": "shutdown",
  "collection": null,
  "index": null,
  "volatile": null
}
```

Let you stop a Kuzzle instance after any remaining requests are processed, ensuring that no unnecessary `Service Unavailable` errors are returned to connected clients.
