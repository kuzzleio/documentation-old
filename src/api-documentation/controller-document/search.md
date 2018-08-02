---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: search
---

# search

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_search[?from=0][&size=42][&scroll=<time to live>][&includeTrash=<boolean>]`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // A set of filters or queries matching documents you are looking for.
  "query": {
    ...
  },
  "aggregations": {
    ...
  }
}
```


<blockquote class="json">
<p>
**Query:**
</p>
</blockquote>


```json
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "search",

  "body": {
    "query": {

    },
    "aggregations": {

    }
  },

  "from": 0,
  "size": 42,
  "scroll": "1m",
  "includeTrash": false
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "action": "search",
  "controller": "document",
  "requestId": "<unique request identifier>",
  "result": {
    // The initial search request and each subsequent scroll request returns 
    // a new "scrollId" value
    // Only the most recent "scrollId" value should be used.
    "scrollId": "<scroll id>",

    // @deprecated - the "_scroll_id" value is identical to the
    // "scrollId" one. This property is kept only for backward 
    // compatibility with older versions of Kuzzle
    "_scroll_id": "<new scroll id>",

    // An array of objects containing your retrieved documents
    "hits": [
      {
        "_id": "<document unique identifier>",
        "_score": 0,          // Document search relevance score
        "_source": { ... }    // Document content
      },
      {
        // Another document... and so on
      }
    ],
    "aggregations": {
      "aggs_name": {

      }
    },
    // Total number of found documents (not the number of 
    // returned documents in this single response page)
    "total": 42
  }
}
```

Search documents in the persistent data storage layer.

Kuzzle uses the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl.html) syntax.

An empty body matches all documents in the collection.

Optional arguments:

* `aggregations` details how to aggregate the search results. See the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-aggregations.html) for more details
* `size` controls the maximum number of documents returned in the response
* `from` is usually used with the `size` argument, and defines the offset from the first result you want to fetch
* `scroll` is used to fetch large result sets, and it must be set with a [time duration](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/common-options.html#time-units). If set, a forward-only cursor will be created (and automatically destroyed at the end of the set duration), and its identifier will be returned in the `scrollId` property, along with the first page of results. This cursor can then be moved forward using the [`scroll` API action]({{ site_base_path }}api-documentation/controller-document/scroll)
* `includeTrash` is used to include documents in the [trashcan]({{ site_base_path }}guide/essentials/document-metadata/)

<aside class="warning">
  <p>
  There is a limit to how many documents can be returned with a single search query. That limit is currently set at 10000 documents.

  To handle larger result sets, you can either use the `from` and `size` parameters, or the `scroll` one (see above).
</aside>
