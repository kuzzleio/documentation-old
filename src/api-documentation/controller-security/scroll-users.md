---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: scrollUsers
---


# scrollUsers

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/users/_scroll/&lt;scrollId&gt;[?scroll=&lt;time to live&gt;]</code>  
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
  "controller": "security",
  "action": "scrollUsers",
  "scrollId": "<scrollId>",
  "scroll": "<time to live>"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "action": "scrollUsers",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    // scroll requests may return a new scroll identifier
    // only the most recent scrollId should be used
    "scrollId": "<new scroll id>",

    // An array of objects containing your retrieved documents
    "hits": [
      {
        "_id": "<firstKuid>",
        "_source": { ... }             // The user object content
      },
      {
        ...
      }
    ],
    "total": "<number of found users>"
  }
}
```

This method moves a result set cursor forward, created by a [`searchUsers` query]({{ site_base_path }}api-documentation/controller-security/search-users) with the `scroll` argument provided.

The response may contain a *different* cursor identifier, pointing to the next page of results.

The optional `scroll` argument allows you to refresh the cursor duration,using the [time to live](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/common-options.html#time-units) value.

<aside class="warning">
  The results that are returned from a `scrollUsers` request reflect the state of the index at the time
  that the initial search request was made, like a snapshot in time. Subsequent changes
  to documents (index, update or delete) will only affect later search requests.
</aside>
