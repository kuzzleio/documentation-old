---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteByQuery
---

# deleteByQuery


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
    "hits": ["id1", "id2", ..., "idn"]
  }
}
```

Deletes all the documents matching the given filter or query from Kuzzle's database.

Kuzzle uses the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/query-dsl.html) syntax.
