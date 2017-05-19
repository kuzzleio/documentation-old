---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: setAutoRefresh
---

# setAutoRefresh


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/_autoRefresh`  
**Method:** `POST`
</p>
</blockquote>

```js
{
  "autoRefresh": "<true|false>"
}
```

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```json
{
  "index": "<index>",
  "controller": "index",
  "action": "setAutoRefresh",
  "body": {
    "autoRefresh": "<true|false>"
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "controller": "index",
  "action": "setAutoRefresh",
  "requestId": "<unique request identifier>",
  "result": "<true|false>" // The autoRefresh status set for the index
}
```

The `autoRefresh` flag, when set to true, will make Kuzzle perform a
[`refresh`](https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api) request
immediately after each write request, forcing the documents to be immediately visible to search.

Given an index, the `setAutoRefresh` action updates its `autoRefresh` status.

<aside class="left warning">
  <p>
    A refresh operation comes with some performance costs.
  </p>
  <p>
    While forcing the autoRefresh can be convenient on a development or test environmnent, it is advised to avoid
    using it on production or at least to carefully monitor its implications before using it.
  </p>
</aside>
