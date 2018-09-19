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
**URL:** `http://kuzzle:7512/admin/_shutdown`  
**Method:** `POST`
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
  "volatile": null,
  "result": { "acknowledge": true }
}
```

Let you stop a Kuzzle instance after any remaining requests are processed.

Subsequent calls made while a shutdown is underway will result in a [PreconditionError]({{ site_base_path }}api-documentation/errors#preconditionerror).  

#### Cluster Mode

In a Cluster environment, the shutdown action will be propagated across all nodes.
