---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: scroll
---

# scroll

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/_scroll/&lt;scrollId&gt;[?scroll=&lt;time to live&gt;]</code>  
<br><b>Method:</b> <code>GET</code>
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query:</b>
</p>
</blockquote>


```json
{
  "controller": "document",
  "action": "scroll",
  "scrollId": "<scrollId>",
  "scroll": "<time to live>"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "action": "scroll",
  "controller": "document",
  "requestId": "<unique request identifier>",
  "result": {
    // scroll requests may return a new scroll identifier
    // only the most recent scrollId should be used
    "scrollId": "<new scroll id>",

    // @deprecated - the "_scroll_id" value is identical to the
    // "scrollId" one. This property is kept only for backward 
    // compatibility with older versions of Kuzzle
    "_scroll_id": "<new scroll id>",

    // An array of objects containing your retrieved documents
    "hits": [
      {
        "_id": "<document unique identifier>",
        "_score": 0,          // Document search relevance score
        "_source": { .. }     // Document content
      },
      {
        // Another document... and so on
      }
    ],
    // Total number of found documents (not the number of 
    // returned documents in this single response page)
    "total": 42
  }
}
```

This method moves a result set cursor forward, created by a [`search` query]({{ site_base_path }}api-documentation/controller-document/search/) with the `scroll` argument provided.

The response may contain a *different* cursor identifier, pointing to the next page of results.

The optional `scroll` argument allows you to refresh the cursor duration,using the [time to live](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/common-options.html#time-units) value.

<aside class="warning">
  The results that are returned from a `scroll` request reflect the state of the index at the time
  that the initial search request was made, like a snapshot in time. Subsequent changes
  to documents (index, update or delete) will only affect later search requests.
</aside>
