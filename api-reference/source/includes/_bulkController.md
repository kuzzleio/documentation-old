# ~ bulk controller

<aside class="warning">
The bulk operations only apply to the persistent data storage layer.
You <strong>won't receive any real-time notfications</strong> on your document subcriptions
even if some of the documents in the import match your subscription filters.
</aside>

A bulk import allows your application to perform multiple writing operations thanks to a single query.
This is especially useful if you want to create a large number of documents. A bulk import will be
a lot faster compared to creating them individually using `create` queries.

For other queries, the syntax for bulk imports closely resembles the
[ElasticSearch Bulk API](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/docs-bulk.html).


## import


### Performing a bulk import on a data collection

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/<collection>/_bulk`<br/>
>**Method:** `POST`<br/>
>**Body:**

<section class="http"></section>

```litcoffee
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

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "bulk",
  "action": "import",

  "body": {
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
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
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
          "status": <HTTP status code>
        }
      },
      {
        "create": {
          "_id": "<documentId>",
          "status": <HTTP status code>
        }
      },
      {
        "create": {
          "_id": "<documentId>",
          "status": <HTTP status code>
        }
      }
    ]
  }
}
```

You can use the `bulk import` to save a list of documents in one specific `collection` in a specified `index`.  
In such case, the `collection` in which the documents need to be inserted needs to be specified in the query.

In case a subset of the queries sent within the request fail, the client will receive a <a href="#partialerror">PartialError</a> object.

### Performing a global bulk import

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_bulk`<br/>
>**Method:** `POST`<br/>
>**Body:**

<section class="http"></section>

```litcoffee
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

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "bulk",
  "action": "import",

  "body": {
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
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "bulk",
  "action": "import",
  "requestId": "<unique request identifier>",
  "result": {
    // The list of executed queries, with their status
    "hits": [
      {
        "create": {
          "_id": "<documentId>",
          "status": <HTTP status code>
        }
      },
      {
        "create": {
          "_id": ""<documentId>",
          "status": <HTTP status code>
        }
      },
      {
        "create": {
          "_id": "<documentId>",
          "status": <HTTP status code>
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
