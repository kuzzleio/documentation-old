---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: count
---

# count


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_count`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // A set of filters or queries matching documents you are looking for.
  // Use "query" instead of "filter" if you want to perform a query instead.
  "filter": {
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
  "action": "count",

  "body": {
    "filter": {}
  }
}
```

>**Response**

```js
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "count",
  "requestId": "<unique request identifier>",
  "result": {
    "count": "<number of found documents>"
  }
}
```

Given some filters, gets the number of matching documents from Kuzzle's data storage layer.

Kuzzle uses the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/query-dsl.html) syntax.
