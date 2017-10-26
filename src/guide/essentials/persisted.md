---
layout: full.html
algolia: true
title: Working with persistent data
order: 400
---

# Working with persistent data

Kuzzle relies on [Elasticsearch](https://www.elastic.co/) to store and fetch persistent data.

In Kuzzle, data is organized in the following way:

* **Documents** are the atomic unit of data. They are defined as JSON structures, in the classical NoSQL fashion and are identified by a unique `_id`.
* Documents are grouped into **Collections**, identified by a unique name.
* Collections are grouped into **Indexes**, identified by a unique name.

---

## Why document identifiers are not part of their content?

Contrary to relational databases, where primary and foreign keys are stored in data tables and used to identify parts and subparts of data, NoSQL databases are key-value repositories.

As Kuzzle has been primarily built to work with document-oriented databases (a subset of NoSQL databases), each stored value is a whole document, meaning that key-value pairs are more like id-document pairs.

This means that document identifiers are not a part of the content they are referencing, but external values used to identify document contents.

This is why Kuzzle API handles `_id` and `_source` arguments separately, as the rest of this guide below will show.

---

## Creating a new index and a new collection

Before continuing this tutorial, we need to [**create a new index**]({{ site_base_path }}api-documentation/controller-index/create/) to store collections. We will call it `myindex`.

To create a new index, we only need to send the following `POST` request to the API endpoint (no body is necessary): `http://localhost:7512/myindex/_create`

Here is Kuzzle's response:

```json
{
    "requestId": "<random unique request id>",
    "status": 200,
    "error": null,
    "controller": "index",
    "action": "create",
    "collection": null,
    "index": "myindex",
    "volatile": null,
    "result": {
        "acknowledged": true,
        "shards_acknowledged": true
    }
}
```

Next, we need to [**create a new collection**]({{ site_base_path }}api-documentation/controller-collection/create/) under that new index, to hold documents. We will call this new collection `mycollection`.

To do so, we need to send the following `PUT` request: `http://localhost:7512/myindex/mycollection`

Response:

```json
{
    "requestId": "<random unique request id>",
    "status": 200,
    "error": null,
    "controller": "collection",
    "action": "create",
    "collection": "mycollection",
    "index": "myindex",
    "volatile": null,
    "result": {
        "acknowledged": true
    }
}
```

**Note:** we just created a new collection, without any field mapping. The database layer will automatically create a mapping for new fields, by trying to infer the best datatype according to the supplied field data. Since a mapping cannot be changed once created, it's strongly advised to [**update the collection mappings**]({{ site_base_path }}guide/essentials/persisted/#document-mapping) as soon as the collection has been created. For now, we will continue this tutorial with automatic field mappings.

--- 

## Getting a list of existing collections

You may ask Kuzzle for a [**list of collections**]({{ site_base_path }}api-documentation/controller-collection/list) in a given index. Let's try to list collections created under the `myindex` index, by sending a `GET` request to `http://localhost:7512/myindex/_list`.

```json
{
  "status": 200,
  "error": null,
  "requestId": "<random unique request id>",
  "controller": "collection",
  "action": "list",
  "collection": null,
  "index": "myindex",
  "volatile": null,
  "headers": {},
  "result": {
    "collections": [
      {
        "name": "mycollection",
        "type": "stored"
      }
    ],
    "type": "all"
  }
}
```

The `result` field in the response contains an array of `collections`, each one defined by a `name` and a `type`.  
Since we created `mycollection`, its type is `stored` (which stands for persistent). This is made to distinguish persisted collections from the virtual ones, used as channels for `realtime` (or volatile) [real-time messages]({{ site_base_path }}guide/essentials/real-time).

---

## Document CRUD

Kuzzle ships with a full data [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) API that enables you to operate in many ways on your documents.

Let's [**create a new document**]({{ site_base_path }}api-documentation/controller-document/create) in our newly created collection `mycollection`, within the `myindex` index.  
This is done by sending a `POST` request to the API endpoint `http://localhost:7512/myindex/mycollection/_create`, with the document's content as the request body:

```json
{
  "message": "Hello, world!"
}
```

Notice that the document is associated to the auto-generated id `AVkDBl3YsT6qHI7MxLz0`, as we can see in the response:

```json
{
  "status": 200,
  "error": null,
  "requestId": "<random unique request id>",
  "controller": "document",
  "action": "create",
  "collection": "mycollection",
  "index": "myindex",
  "volatile": null,
  "headers": {},
  "result": {
    "_index": "myindex",
    "_type": "mycollection",
    "_id": "AVkDBl3YsT6qHI7MxLz0",
    "_version": 1,
    "result": "created",
    "_shards": {
      "total": 2,
      "successful": 1,
      "failed": 0
    },
    "created": true,
    "_source": {
      "message": "Hello, world!"
    },
    "_meta": {
      "author": "-1",
      "createdAt": 1481814465050,
      "updatedAt": null,
      "updater": null,
      "active": true,
      "deletedAt": null
    }
  }
}
```


Take some time to examine the content of a [Kuzzle Response]({{ site_base_path }}guide/essentials/request-and-response-format/#status-codes). You may notice that it contains useful information like the name of the controller and action that correspond to the HTTP route we hit with our request, or the complete KuzzleDocument object we just created.

Let's [**modify to our brand new document**]({{ site_base_path }}api-documentation/controller-document/update) by sending a `PUT` request to `http://localhost:7512/myindex/mycollection/AVkDBl3YsT6qHI7MxLz0/_update` with the body set to:

```json
{
  "message": "in a bottle",
  "an_englishman": "in New York"
}
```

Which gives us the following response:

```json
{
  "status": 200,
  "error": null,
  "requestId": "6241ec4d-8529-43ba-9b77-3028b99cd621",
  "controller": "document",
  "action": "update",
  "collection": "mycollection",
  "index": "myindex",
  "volatile": null,
  "headers": {},
  "result": {
    "_index": "myindex",
    "_type": "mycollection",
    "_id": "AVkDBl3YsT6qHI7MxLz0",
    "_version": 2,
    "result": "updated",
    "_shards": {
      "total": 2,
      "successful": 1,
      "failed": 0
    }
  }
}
```

Now, we'll let you figure out what happens when we send a `DELETE` request to `http://localhost:7512/myindex/mycollection/AVkDBl3YsT6qHI7MxLz0` with an empty body (take a look at the [API Reference]({{ site_base_path }}api-documentation/controller-document/delete) if you don't want to try).

---

## Document Search

One thing that Elasticsearch is _really_ good at doing is... Searching! It enables to create extremely precise search queries, thanks to its powerful query DSL. We wrote a [comprehensive cookbook]({{ site_base_path }}elasticsearch-cookbook) to help you understand how it works in detail, but let's take a look at a couple of simple examples, just to get started.

Say we want to [**find**]({{ site_base_path }}api-documentation/controller-document/search) all the documents within `mycollection`, via the HTTP protocol. To do it, we send a `POST` request to `http://localhost:7512/myindex/mycollection/_search` (we leave the body empty since we have no filters to apply to our query). Depending on the documents you have created in your database, the response will look like:

```json
{
  "status": 200,
  "error": null,
  "requestId": "<random unique request id>",
  "controller": "document",
  "action": "search",
  "collection": "mycollection",
  "index": "myindex",
  "volatile": null,
  "headers": {},
  "result": {
    "took": 69,
    "timed_out": false,
    "_shards": {
      "total": 5,
      "successful": 5,
      "failed": 0
    },
    "hits": [
      {
        "_index": "myindex",
        "_type": "mycollection",
        "_id": "AVkDLAdCsT6qHI7MxLz4",
        "_score": 0,
        "_source": {
          "message": "Hey! Ho!"
        },
        "_meta": {
          "author": "-1",
          "createdAt": 1481816934209,
          "updatedAt": null,
          "updater": null,
          "active": true,
          "deletedAt": null
        }
      },
      {
        "_index": "myindex",
        "_type": "mycollection",
        "_id": "AVkDK9iNsT6qHI7MxLz3",
        "_score": 0,
        "_source": {
          "message": "Hello, world!"
        },
        "_meta": {
          "author": "-1",
          "createdAt": 1481816922252,
          "updatedAt": null,
          "updater": null,
          "active": true,
          "deletedAt": null
        }
      },
      {
        "_index": "myindex",
        "_type": "mycollection",
        "_id": "AVkDLCdRsT6qHI7MxLz5",
        "_score": 0,
        "_source": {
          "message": "Let's go!"
        },
        "_meta": {
          "author": "-1",
          "createdAt": 1481816942415,
          "updatedAt": null,
          "updater": null,
          "active": true,
          "deletedAt": null
        }
      }
    ],
    "total": 3,
    "max_score": 0
  }
}
```

Looks neat. Say that now we only want to **query** the documents containing the word `Hey` in the `message` field. We can achieve this by adding the following query to our body:

```json
{
  "query": {
      "match": {
          "message":"Hey"
      }
    }
}
```

Which gives, as a result, the following response:

```json
{
  "status": 200,
  "error": null,
  "requestId": "<random unique request id>",
  "controller": "document",
  "action": "search",
  "collection": "mycollection",
  "index": "myindex",
  "volatile": null,
  "headers": {},
  "result": {
    "took": 6,
    "timed_out": false,
    "_shards": {
      "total": 5,
      "successful": 5,
      "failed": 0
    },
    "hits": [
      {
        "_index": "myindex",
        "_type": "mycollection",
        "_id": "AVkDLAdCsT6qHI7MxLz4",
        "_score": 0.25811607,
        "_source": {
          "message": "Hey! Ho!"
        },
        "_meta": {
          "author": "-1",
          "createdAt": 1481816934209,
          "updatedAt": null,
          "updater": null,
          "active": true,
          "deletedAt": null
        }
      }
    ],
    "total": 1,
    "max_score": 0.25811607
  }
}
```

---

## Document mapping

As previously said, Kuzzle relies on Elasticsearch to persist documents. Elasticsearch uses a mapping internally to match a document field to a field type. This mapping is attached to a `collection` (a `type` in Elasticsearch terminology).
If no mapping is defined, Elasticsearch will infer it automatically from input documents.

ou may want to define mappings manually, especially to provide more details to Elasticsearch on how it should interpret the documents stored in your collections.
To do so, Kuzzle expose a mapping creation API route.
This is done by sending a `PUT` request to the API endpoint `http://localhost:7512/myindex/mycollection/_mapping` with the body set to your mapping:

```json
{
  "properties": {
    "someField": {
      "type": "date"
    }
  }
}
```

Which gives us the following response:

```json
{
  "action": "updateMapping",
  "collection": "mycollection",
  "controller": "collection",
  "error": null,
  "index": "myindex",
  "volatile": null,
  "requestId": "<random unique request id>",
  "result": {
    "acknowledged": true
  },
  "status": 200
}
```

Here we defined a new field called `someField` of type `date` in our collection `mycollection`. This is especially useful when
dealing with capabilities such as specific types (`date`, `geo_shape`, ...), full-text search and complex data structures (`nested`, ...) of Elasticsearch.
As the mapping of the collection can not be changed once it is set (even if Elasticsearch did it automatically for you),
you should almost always define mappings when creating collections, preferably before sending documents in them.

The syntax to use is the one defined by [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html).

---

## Where do we go from here?


* Refer to the [Elasticsearch cookbook]({{ site_base_path }}elasticsearch-cookbook) to get more details on how querying works in Kuzzle
* Get history information, put a document in the trashcan and recover it, using [document metadata]({{ site_base_path }}guide/essentials/document-metadata)
* Keep track of the changes on your documents via the [Real-time Notifications]({{ site_base_path }}guide/essentials/real-time)
