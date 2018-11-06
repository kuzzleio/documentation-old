---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: flushdb
---

# flushdb

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_flushdb</code>  
<br><b>Method:</b> <code>POST</code>
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "flushdb"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "flushdb",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": 1
}
```

Deletes all the keys of the database dedicated to client applications (the reserved space for Kuzzle is unaffected).

[[_Redis documentation_]](https://redis.io/commands/flushdb)
