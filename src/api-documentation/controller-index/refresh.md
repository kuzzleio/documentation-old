---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: refresh
---

# refresh

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/_refresh</code>  
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
  "index": "<index>",
  "controller": "index",
  "action": "refresh"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "controller": "index",
  "action": "refresh",
  "requestId": "<unique request identifier>",
  "result": {
    "_shards": {
        "failed": 0,
        "succressful": 5,
        "total": 10
    }
  }
}
```

When writing or deleting documents in Kuzzle, the update needs to be indexed before being reflected
in the search index.
By default, this operation can take up to 1 second.

Given an index, the `refresh` action forces a
[`refresh`](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/docs-refresh.html), making the documents visible in a search immediately.

<aside class="left warning">
  <p>
    A refresh operation comes with some performance costs.<br>
  </p>
  <p>
    From <a href="https://www.elastic.co/guide/en/elasticsearch/reference/5.4/docs-refresh.html">
    Elasticsearch documentation</a>:
    <div class="quote">
      "While a refresh is much lighter than a commit, it still has a performance cost.
      A manual refresh can be useful when writing tests, but don’t do a manual refresh every time
      you index a document in production; it will hurt your performance. Instead, your application
      needs to be aware of the near real-time nature of Elasticsearch and make allowances for it."
    </div>
  </p>
</aside>

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
- [NotFoundError]({{ site_base_path }}api-documentation/errors/#notfounderror)
