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
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_search[?from=0][&size=42][&scroll=&lt;time to live&gt;][&includeTrash=&lt;boolean&gt;]</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  // A set of filters or queries matching documents you are looking for.
  "query": {
    // ...
  },
  "aggregations": {
    // ...
  },
  "sort": [
    // ...
  ]
}
```


<blockquote class="json">
<p>
<b>Query:</b>
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
      // ...
    },
    "aggregations": {
      // ...
    },
    "sort": [
      // ...
    ]
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

# body properties

All of the following body properties are optional. An empty body matches all documents in the queried collection.

* `query`: the search query itself, using the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl.html) syntax.
* `aggregations`: control how the search result should be [aggregated](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-aggregations.html)
* `sort`: contains a list of fields, used to [sort search results](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-sort.html), in order of importance

# Optional arguments

Alongside the body, additional optional arguments can be provided:

* `includeTrash` is used to include documents in the [trashcan]({{ site_base_path }}guide/essentials/document-metadata/)
* `from` is usually used with the `size` argument, and defines the offset from the first result you want to fetch
* `size` controls the maximum number of documents returned in the response
* `scroll` is used to fetch large result sets, and it must be set with a [time duration](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/common-options.html#time-units). If set, a forward-only cursor will be created (and automatically destroyed at the end of the set duration), and its identifier will be returned in the `scrollId` property, along with the first page of results. This cursor can then be moved forward using the [`scroll` API action]({{ site_base_path }}api-documentation/controller-document/scroll)

# Retrieving large result sets

There is a limit to how many documents can be returned with a single search query. 

That limit is by default set at 10000 documents, and you can't get over it even with the `from` and `size` options.

To handle larger result sets, you have to either use the [`scroll` option]({{ site_base_path }}api-documentation/controller-document/search) or the Elasticsearch's [search_after command](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-search-after.html) (only available if the results are sorted).
