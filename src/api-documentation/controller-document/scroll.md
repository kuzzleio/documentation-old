---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: scroll
---

# scroll


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_scroll/<scrollId>[?scroll=<time to live>]`  
**Method:** `GET`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query:**
</p>
</blockquote>


```json
{
  "controller": "document",
  "action": "scroll",
  "scrollId": "<scrollId>",

  "scroll": "<time to live>"
  }
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
    "_scroll_id": "<new scroll id>",

    // An array of objects containing your retrieved documents
    "hits": [
      {
        "_id": "documentId",
        "_score": "<document score>"
        "_source": { .. }    // The actual document
      },
      {
   // Another document... and so on
      }
    ],
    "total": "<number of found documents>"
  }
}
```

This method moves forward a result set cursor created by a [`search` query]({{ site_base_path }}api-documentation/controller-document/search/) with the `scroll` argument provided.

The response may contain a *different* cursor identifier, pointing to the next page of results.

The optional `scroll` argument allows to refresh the cursor duration, with a new [time to live](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units) value.

<aside class="warning">
  The results that are returned from a `scroll` request reflect the state of the index at the time
  that the initial search request was made, like a snapshot in time. Subsequent changes
  to documents (index, update or delete) will only affect later search requests.
</aside>
