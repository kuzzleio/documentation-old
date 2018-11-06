---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: import
---

# import

---

## Performing a bulk import on a data collection

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_bulk</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>

```js
{
  // Data mapping using ElasticSearch bulk syntax.
  "bulkData": [
    {"create": {}},
    {"a": "document", "with": "any", "number": "of fields"},
    {"create": {}},
    {"another": "document"},
    {"create": {}},
    {"and": {"another": "one"}},
    {"...": "..."}
  ]
}
```

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>

```json
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "bulk",
  "action": "import",

  "body": {
    "bulkData": [
      {"create": {}},
      {"a": "document", "with": "any", "number": "of fields"},
      {"create": {}},
      {"another": "document"},
      {"create": {}},
      {"and": {"another": "one"}},
      {"...": "..."}
    ]
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
  "controller": "bulk",
  "action": "import",
  "requestId": "<unique request identifier>",
  "result": {
    // The list of executed queries, with their status
    "items": [
      {
        "create": {
          "_id": "<documentId>",
          "status": "<HTTP status code>"
        }
      },
      {
        "create": {
          "_id": "<documentId>",
          "status": "<HTTP status code>"
        }
      },
      {
        "create": {
          "_id": "<documentId>",
          "status": "<HTTP status code>"
        }
      }
    ]
  }
}
```

You can use the `bulk import` to save a list of documents into a specific `collection` of a specified `index`. To do so, the `collection` needs to be specified in the request.

If a subset of the documents fail to save, the client will receive a <a href="{{ site_base_path }}api-documentation/errors/#partialerror">PartialError</a>.

<div style="clear: both"></div>

---

## Performing a global bulk import

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/_bulk</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  // Data mapping using ElasticSearch bulk syntax.
  "bulkData": [
    {"create": {"_index": "<index>", "_type": "<collection>"}},
    {"a": "document", "with": "any", "number": "of fields"},
    {"create": {"_index": "<index>", "_type": "<collection>"}},
    {"another": "document"},
    {"create": {"_index": "<index>", "_type": "<collection>"}},
    {"and": { "another": "one"} },
    ...
    {"create": {"index": { "_index": "<another index>", "_type": "<another collection>" }}}
  ]
}
```

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>

```json
{
  "controller": "bulk",
  "action": "import",

  "body": {
    "bulkData": [
      {"create": {"_index": "<index>", "_type": "<collection>"}},
      {"a": "document", "with": "any", "number": "of fields"},
      {"create": {"_index": "<index>", "_type": "<collection>"}},
      {"another": "document"},
      {"create": {"_index": "<index>", "_type": "<collection>"}},
      {"and": { "another": "one"} },
      {"create": {"index": { "_index": "<another index>", "_type": "<another collection>" }}}
    ]
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "controller": "bulk",
  "action": "import",
  "requestId": "<unique request identifier>",
  "result": {
    // The list of executed queries, with their status
    "items": [
      {
        "create": {
          "_id": "<documentId>",
          "status": "<HTTP status code>"
        }
      },
      {
        "create": {
          "_id": "<documentId>",
          "status": "<HTTP status code>"
        }
      },
      {
        "create": {
          "_id": "<documentId>",
          "status": "<HTTP status code>"
        }
      }
    ]
  }
}
```

The `bulk import` can also be used in a more versatile (yet a little more verbose) way,
to execute operations on multiple data collections in different indexes in a single request.  
To do so, the `collections` need to be specified inside the request message, using the `_type`argument, as specified in the
[ElasticSearch Bulk API](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/docs-bulk.html).
