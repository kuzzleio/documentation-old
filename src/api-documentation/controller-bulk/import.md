---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: import
---

# import

---

## Performing a bulk import on a data collection

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_bulk`  
**Method:** `POST`  
**Body:**
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
**Query**
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
    "hits": [
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

You can use the `bulk import` to save a list of documents in one specific `collection` in a specified `index`.  
In such case, the `collection` in which the documents need to be inserted needs to be specified in the query.

In case a subset of the queries sent within the request fail, the client will receive a <a href="{{ site_base_path }}api-documentation/errors/#partialerror">PartialError</a> object.

<div style="clear: both"></div>

---

## Performing a global bulk import

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_bulk`  
**Method:** `POST`  
**Body:**
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
**Query**
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

Response**

```javascript
{
  "status": 200,
  "error": null,
  "controller": "bulk",
  "action": "import",
  "requestId": "<unique request identifier>",
  "result": {
    // The list of executed queries, with their status
    "hits": [
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
to execute operations on a whole database, modifying multiple data collections in different indexes at once.  
The `collections` to modify then need to be specified inside the query message,using the `_type`argument, as specified in the
[ElasticSearch Bulk API](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/docs-bulk.html).
