# ~ document controller


## count

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<index>/<collection>/_count`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // A set of filters or queries matching documents you are looking for.
  // Use "query" instead of "filter" if you want to perform a query instead.
  "filter": {
    ...
  }
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "count",

  // A set of filters or queries matching documents you are looking for.
  // Use "query" instead of "filter" if you want to perform a query instead.
  "body": {
    "filter": {
      ...
    }
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
  "controller": "document",
  "action": "count",
  "requestId": "<unique request identifier>",
  "result": {
    "count": <number of found documents>
  }
}
```

Given some filters, gets the number of matching documents from Kuzzle's data storage layer.

Kuzzle uses the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/query-dsl.html) syntax.


## create

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<index>/<collection>/_create[?refresh=wait_for]` or `http://kuzzle:7511/<index>/<collection>/<documentId>/_create[?refresh=wait_for]`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // The message to send
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "create",
  ["refresh": "wait_for",]
  "_id": "<documentId>",              // Optional. If not provided, will be generated automatically.
  "body": {
    // the document to create
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
  "controller": "document",
  "action": "create",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",            // The generated or provided document id
    "_version": 1                     // The version of the document in the persistent data storage
    "_source": {                      // The created document
      ...
    },
  }
}
```

Creates a new document in the persistent data storage.

Returns an error if the document already exists.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document indexation (availability using `search`).


## createOrReplace

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<index>/<collection>/<documentId>[?refresh=wait_for]`  
>**Method:** `PUT`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // The document to update
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "createOrReplace",
  ["refresh": "wait_for",]
  "_id": "<documentId>",            // Mandatory: The document id.
  // The document itself
  "body": {
    ...
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
  "controller": "document",
  "action": "createOrReplace",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",
    "_source": {                      // The created document
      ...
    },
    "_version": <number>,             // The new version number of this document
    "created": <boolean>              // true: a new document has been created, false: the document has been updated
  }
}
```

Creates a new document in the persistent data storage, or replaces it if it already exists.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document indexation (availability using `search`).


## delete

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<index>/<collection>/<documentId>[?refresh=wait_for]`  
>**Method:** `DELETE`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "delete",
  ["refresh": "wait_for",]

  // The document id you provided or that was generated at document creation.
  // it is also the one returned during a search query.
  "_id": "<documentId>"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "delete",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>"             // The deleted document identifier
  }
}
```

Given a `documentId`, deletes the corresponding document from Kuzzle's database.

Only documents in the persistent data storage layer can be deleted.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document deletion (and its unavailability in `search`).


## deleteByQuery

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<index>/<collection>/_query`  
>**Method:** `DELETE`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // A set of filters or queries matching documents you are looking for.
  // Use "query" instead of "filter" if you want to perform a query instead.
  "filter": {
    ...
  }
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "deleteByQuery",

  // A set of filters or queries matching documents you are looking for.
  // Use "query" instead of "filter" if you want to perform a query instead.
  "body": {
    "filter": {
      ...
    }
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

Kuzzle uses the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/2.3/query-dsl.html) syntax.


## get

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<index>/<collection>/<documentId>`  
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "get",

  // The document id you provided or that was generated at document creation.
  // it is also the one returned during a search query.
  "_id": "<documentId>"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "get",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",
    "_index": "<index>",
    "_type": "<collection>",
    "_version": 1,
    "_source": {
      "name": {
        "first": "Steve",
        "last": "Wozniak"
      },
      "hobby": "Segway polo",
      ...
    }
  }
}
```

Given a `document id`, retrieve the corresponding document from the database.

Only documents in the persistent data storage layer can be retrieved.


## replace

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<index>/<collection>/<documentId>/_replace[?refresh=wait_for]`  
>**Method:** `PUT`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // The document to update
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "replace",
  ["refresh": "wait_for",]
  // The document itself
  "body": {
    ...
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
  "controller": "document",
  "action": "replace",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",
    "_source": {                      // The resulting document
      ...
    },
    "_version": <number>,             // The new version number of this document
    "created": false
  }
}
```

Replaces an existing document in the persistent data storage.
Only documents in the persistent data storage layer can be replaced.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document indexation (availability using `search`).


## scroll

<section class="http"></section>

>**URL:** `http://kuzzle:7511/_scroll/<scrollId>`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // The scroll parameter tells Elasticsearch to keep the search context open for another 1m.
  "scroll": "1m"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "document",
  "action": "scroll",

  "body": {
    "scrollId": "<scrollId>"
    // The scroll parameter tells Elasticsearch to keep the search context open for another 1m.
    "scroll": "1m"
  }
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "scroll",
  "controller": "document",
  "requestId": "<unique request identifier>",
  "result": {
    // The initial search request and each subsequent scroll request returns a new _scroll_id 
    // only the most recent _scroll_id should be used.
    "_scroll_id": "<new scroll id>",

    // An array of objects containing your retrieved documents
    "hits": [
      {
        "_id": "documentId",
        "_score": "<document score>"
        "_source": { .. }         // The actual document
      },
      {
        // Another document... and so on
      }
    ],
    "total": <number of found documents>,
    "max_score": 1,
    "timed_out": false,
    "took": 1
  }
}
```

While a search request returns a single “page” of results, the scroll API can
be used to retrieve large numbers of results (or even all results) from a single
search request, in much the same way as you would use a cursor on a traditional database.

Scrolling is not intended for real time user requests, but rather for processing large amounts of data.

In order to use scrolling, the initial search request should specify the scroll parameter in the query string,
which tells Elasticsearch how long it should keep the “search context” alive.

<aside class="warning">
  The results that are returned from a scroll request reflect the state of the index at the time
  that the initial search request was made, like a snapshot in time. Subsequent changes
  to documents (index, update or delete) will only affect later search requests.
</aside>


## search

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<index>/<collection>/_search[?from=0][&size=42]`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // A set of filters or queries matching documents you are looking for.
  "query": {
    ...
  },
  "aggregations": {
    ...
  }
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "search",

  "body": {
    // A set of filters or queries matching documents you are looking for.
    "query": {

    },
    "aggregations": {

    }
  },
  // "from" and "size" argument for pagination
  "from": 0,
  "size": 42
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
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
        "_source": { ... }         // The actual document
      },
      {
        // Another document... and so on
      }
    ],
    "aggregations": {
      "aggs_name": {

      }
    }
    "total": <number of found documents>,
    "max_score": 1,
    "timed_out": false,
    "took": 1
  }
}
```

Only documents in the persistent data storage layer can be searched.

Kuzzle uses the [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) syntax.

`aggregations` is not mandatory, see the
[Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)
for more details.


## update

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<index>/<collection>/<documentId>/_update[?refresh=wait_for]`  
>**Method:** `PUT`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  "field_to_update1": "new value",
  "field_to_update2": "new value",
  ...
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "update",
  ["refresh": "wait_for",]
  // The document id you provided or that was generated at document creation.
  // it is also the one returned during a search query.
  "_id": "<documentId>"

  // The actual update query
  "body": {
    "field_to_update1": "new value",
    "field_to_update2": "new value",
    ...
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
  "controller": "document",
  "action": "update",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",
    "_source": {                      // The resulting document
      ...
    },
    "_version": <number>,             // The new version number of this document
    "created": false
  }
}
```

Only documents in the persistent data storage layer can be updated.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document indexation (availability using `search`).


## validate

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<index>/<collection>/_validate`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
    // The message to send
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  index: "<index>",
  collection: "<collection>",
  controller: "document",
  action: "validate",
  // The document itself
  body: {
    ...
  }
}
```

>Response

```litcoffee
{
  status: 200,                      // Assuming everything went well
  error: null,                      // Assuming everything went well
  index: "<index>",
  collection: "<collection>",
  controller: "document",
  action: "validate",
  metadata: {},
  result: {
    errorMessages: {},              // There is no error messages
    valid: true                     // The document complies with validation specifications
  }  
}
```

Validate data against existing validation rules. The data is not published nor stored by Kuzzle
If the document complies, the `result.valid` value is `true`, if not, it is `false`.
When the document does not complies, both `result.errorMessages` contains some very detailed hints on what is wrong with the document.
Note that if no validation specifications are set for the &lt;data index>/&lt;data collection>, the document always validate.
In any ways, the document is **not** stored nor published.
