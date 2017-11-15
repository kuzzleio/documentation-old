---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteByQuery
---

# deleteByQuery

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_query`  
**Method:** `DELETE`  
**Body:**
</p>
</blockquote>


```js
{
  // A set of filters or queries matching documents you are looking for.
  // Use "query" instead of "filter" if you want to perform a query instead.
  "query": {
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
  "action": "deleteByQuery",
  
  "includeTrash": false,
  "bypassTrash": false,

  "body": {
    "query": {}
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "deleteByQuery",
  "requestId": "<unique request identifier>",
  "result": {
    // Number of deleted documents
    "deleted": 42
  }
}
```

Deletes all the documents matching the given filter or query from Kuzzle's database.

Kuzzle uses the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/query-dsl.html) syntax.

Optional arguments:

* `bypassTrash` (boolean): If set to `true`, directly deletes documents from Kuzzle database layer, without marking them as trashed. Default to `false`
* `includeTrash` (boolean): If set to `true`, includes trashed documents in the query. Default to `false`
* `refresh` (boolean): If set to `true`, refreshes Kuzzle underlying database index (cf [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/guide/current/near-real-time.html#refresh-api) for more information).

<aside class="warning">
  Deletions done by this method do not trigger any real-time notification!
</aside>
