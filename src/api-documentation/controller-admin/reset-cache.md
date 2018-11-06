---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: resetCache
---

# resetCache

{{{since "1.4.0"}}}


<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/admin/_resetCache?database=[internalCache|memoryStorage]</code>
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
  "controller": "admin",
  "action": "resetCache",
  "database": "internalCache"
}
```

>**Response**

```javascript
{
  "requestId": "d16d5e8c-464a-4589-938f-fd84f46080b9",
  "status": 200,
  "error": null,
  "controller": "admin",
  "action": "resetCache",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": { "acknowledge": true }
}
```

Asynchronously clear Redis database used by Kuzzle.  

There are two Redis databases that you can clear:

 - `internalCache` : used by Kuzzle to cache internal data, such as authentication tokens, documents followed by real-time subscriptions, active paginated search queries, API usage statistics or cluster state
 - `memoryStorage` : memory cache managed by Kuzzle's [memoryStorage]({{ site_base_path }}api-documentation/controller-memory-storage/) API
