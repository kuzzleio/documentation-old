---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getAutoRefresh
---

# getAutoRefresh

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/_autoRefresh`  
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
  "controller": "index",
  "action": "getAutoRefresh"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "requestId": "<unique request identifier>",
  "index": "<index>",
  "controller": "index",
  "action": "getAutoRefresh",
  "result":  "<true|false>" // The autoRefresh status for <index>
}
```

The `autoRefresh` flag, when set to true, will make Kuzzle perform a
[`refresh`](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/docs-refresh.html) request
immediately after each write request, causing documents to be immediately visible in a search.

The `getAutoRefresh` actions returns the current `autoRefresh` status for the given index.

<aside class="left warning">
  <p>
    A refresh operation comes with some performance costs.
  </p>
  <p>
    While forcing the autoRefresh can be convenient on a development or test environmnent, we recommend that you avoid
    using it in production or at least carefully monitor its implications before using it.
  </p>
</aside>
