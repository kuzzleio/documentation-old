---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: create
---

# create

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/_create`  
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
  "index": "<index>",
  "controller": "index",
  "action": "create"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "action": "create",
  "controller": "index",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true,
    "shards_acknowledged": true
  }
}
```

Creates a new [index]({{ site_base_path }}guide/essentials/persisted) in Kuzzle's persistent storage layer.
