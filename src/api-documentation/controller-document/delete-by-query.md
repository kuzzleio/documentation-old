---
layout: side-code.html.hbs
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
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_query</code>  
<br><b>Method:</b> <code>DELETE</code>  
<br><b>Body:</b>
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
<b>Query:</b>
</p>
</blockquote>


```json
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "deleteByQuery",

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
    // Array of strings listing the IDs of removed documents
    "ids": ["id1", "id2", ..., "idn"]
  }
}
```

Deletes all the documents from Kuzzle that match the given filter or query.

Kuzzle uses the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl.html) syntax.
