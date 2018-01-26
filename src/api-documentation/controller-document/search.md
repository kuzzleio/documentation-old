---
layout: side-code.html
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
  },

  // Optional arguments
  "from": 0,
  "size": 42,
  "scroll": "1m",
  "includeTrash": false
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
  "scroll": "<time to live>"
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
    // The initial search request and each subsequent scroll request returns a new _scroll_id 
    // only the most recent _scroll_id should be used.
    "_scroll_id": "<scroll id>",

    // An array of objects containing your retrieved documents
    "hits": [
      {
        "_id": "documentId",
        "_score": "<document score>"
        "_source": { ... }    // The actual document
      },
      {
   // Another document... and so on
      }
    ],
    "aggregations": {
      "aggs_name": {

      }
    }
    "total": "<number of found documents>"
  }
}
```

Only documents in the persistent data storage layer can be searched.

Kuzzle uses the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/query-dsl.html) syntax.

An empty body matches all documents in the collection.

Optional arguments:

* `aggregations` details how to aggregate the search results. See the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/search-aggregations.html) for more details
* `size` controls the maximum number of documents returned in the response
* `from` is usually used with the `size` argument, and defines the offset from the first result you want to fetch
* `scroll` is used to fetch large result sets, and it must be set with a [time duration](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/common-options.html#time-units). If set, a forward-only cursor will be created (and automatically destroyed at the end of the set duration), and its identifier will be returned in the `_scroll_id` property, along with the first page of results. This cursor can then be moved forward using the [`scroll` API action]({{ site_base_path }}api-documentation/controller-document/scroll)
* `includeTrash` is used to include documents in the [trashcan]({{ site_base_path }}guide/essentials/document-metadata/)

<aside class="warning">
  <p>
  When processing a large number of documents (i.e. more than 1000), using search requests is not the best option.
  </p>
  <p>
  See [`scroll`]({{ site_base_path }}api-documentation/controller-document/scroll) for a more efficient way of processing large result sets.
  </p>
</aside>
