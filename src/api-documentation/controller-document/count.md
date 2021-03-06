---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: count
---

# count

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_count[?includeTrash=&lt;boolean&gt;]</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
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
<b>Query:</b>
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
  },

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
  "controller": "document",
  "action": "count",
  "requestId": "<unique request identifier>",
  "result": {
    // number of found documents
    "count": 42
  }
}
```

Given some filters, gets the number of matching documents from Kuzzle.

Kuzzle uses the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl.html) syntax.

Optional arguments:

- `includeTrash` makes Kuzzle include documents from the [trashcan]({{ site_base_path }}guide/essentials/document-metadata/)
