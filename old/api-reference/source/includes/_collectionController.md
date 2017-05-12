# ~ collection controller


## create

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<data>/<collection>`  
>**Method:** `PUT`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "create"
}
```

>**Response**

```litcoffee
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "create",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  }
}
```

When creating a document, Kuzzle will automatically create a collection if needed.
But in some cases, you may want to create an empty collection directly, prior to storing any document in it.  
This method does nothing if the collection already exists.


## deleteSpecifications

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/<collection>/_specifications`  
>**Method:** `DELETE`

<section class="others"></section>

>**Query**

<section class="others"></section>
```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "deleteSpecifications",
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "action": "deleteSpecifications",
  "controller": "collection",
  "result": {}
}
```

Deletes the validation specification set for the <index>/<collection>.
It responds 200 even there where no validation specification manually set before.

***Note:*** by default, an empty specification is implicitally applied to all collections which. In a way, "no specification set" means "all documents are valid". This is why, using this route when no specifications have been set before, does not produce an error.


## exists

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/<collection>/_exists`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "exists"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "exists",
  "requestId": "<unique request identifier>",
  "result": true
}
```

Checks if a collection exists in Kuzzle database storage layer.


## getMapping

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/<collection>/_mapping`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "getMapping"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "getMapping",
  "requestId": "<unique request identifier>",
  "result": {
    "mainindex": {
      "mappings": {
        <collection>: {

          // Data mapping using ElasticSearch mapping syntax
          "properties": {
            "field1": {type: "field type", "...options..." },
            "field2": {type: "field type", "...options..." },
            ...
            "fieldn": {type: "field type", "...options..." },
          }
        }
      }
    }
  }
}
```

Gets the mapping of the given `collection`.


## getSpecifications

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/<collection>/_specifications`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "getSpecifications",
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "getSpecifications",
  "controller": "collection",
  "collection": "<collection>",
  "index": "<index>",
  "result": {
    "collection": "<collection>",
    "index": "<index>",
    "validation": {
      "fields": {
        myField": {
          "defaultValue": 42,
          "mandatory": true,
          "type": "integer"
        }
        ...
      },
      "strict": true
    }
  }
}

{
  "status": 404,                      // No validation specification has been set for this index/collection
  "error": {
    "_source": {
      "body": {}
    },
    "message": "Not Found"
  },
  "action": "getSpecifications",
  "controller": "collection",
  "index": "<index>",
  "collection": "<collection>"
  "result": null
}
```

Allows to get the validation specifications associated to the given
index and collection if some specifications has been defined first.


## list

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/_list(/<all|stored|realtime>)[?from=0][&size=42]`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "controller": "collection",
  "action": "list",
  "type": "<all|stored|realtime>",
  // "from" and "size" argument for pagination
  "from": 0,
  "size": 42
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "controller": "collection",
  "action": "list",
  "requestId": "<unique request identifier>",
  "result": {
    "collections": [
      {
        "name": "realtime_1", "type": "realtime"
      },
      {
        "name": "realtime_2", "type": "realtime"
      },
      {
        "name": "realtime_...", "type": "realtime"
      },
      {
        "name": "realtime_n", "type": "realtime"
      },
      {
        "name": "stored_1", "type": "stored"
      },
      {
        "name": "stored_2", "type": "stored"
      },
      {
        "name": "stored_...", "type": "stored"
      },
      {
        "name": "stored_n", "type": "stored"
      }
    ],
    "type": "all"
  }
}
```

Returns the complete list of realtime and stored data collections in requested index sorted by name in alphanumerical order.  
The `type` argument filters the returned collections. Allowed values: `all`, `stored` and `realtime` (default : `all`).  
The `from` and `size` arguments allow pagination. They are returned in the response if provided.

## scrollSpecifications

<section class="http"></section>

>**URL:** `http://kuzzle:7512/validations/_scroll/<scrollId>[?scroll=<time to live>]`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "collections",
  "action": "scrollSpecifications",
  "scrollId": "<scrollId>",

  // Optional: new time to live of the cursor
  "scroll": "<time to live>"
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "scrollSpecifications",
  "controller": "collection",
  "requestId": "<unique request identifier>",
  "result": {
    // scroll requests may return a new scroll identifier
    // only the most recent scrollId should be used
    "scrollId": "<new scroll id>",

    // An array of objects containing your retrieved documents
    "hits": [
      {
        "_id": "myIndex#myCollection",
        "_index": "%kuzzle",
        "_score": 1,
        "_source": {
          "collection": "myCollection",
          "index": "myIndex",
          "validation": {
            "fields": {
              "fieldName": {
                "defaultValue": "a default value",
                "mandatory": true,
                "multivalued": {
                  "maxCount": 5,
                  "minCount": 1,
                  "value": true
                },
                "type": "string",
                "typeOptions": {
                  "length": {
                    "max": 12,
                    "min": 2
                  }
                }
              }
            },
            "strict": true
          }
        },
        "_type": "validations"
      },
      {
        ...
      }
    ],
    "total": <number of found specifications>
  }
}
```

This method moves forward a result set cursor created by a [`searchSpecifications` query](#searchspecifications) with the `scroll` argument provided.

The response may contain a *different* cursor identifier, pointing to the next page of results.

The optional `scroll` argument allows to refresh the cursor duration, with a new [time to live](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units) value.

<aside class="warning">
  The results that are returned from a `scrollSpecifications` request reflect the state of the index at the time
  that the initial search request was made, like a snapshot in time. Subsequent changes
  to documents (index, update or delete) will only affect later search requests.
</aside>


## searchSpecifications


<section class="http"></section>

>**URL:** `http://kuzzle:7512/validations/_search[?from=0][&size=10][&scroll=<time to live>]`  
>**Method:** `POST`  
>**Body**

<section class="http"></section>

```litcoffee
{
  // A set of filters or queries matching documents you are looking for.
  "query": {
    ...
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "collection",
  "action": "searchSpecifications",
  "body": {
    // A set of filters or queries matching documents you are looking for.
    "query": {
      "Some": "filters"
    }
  },
  // Optional arguments
  "from": 0,
  "size": 42,
  "scroll": "<time to live>"
}
```
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "collection",
  "action": "searchSpecifications",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result": {
    "_shards": {
        "failed": 0,
        "successful": 5,
        "total": 5
    },
    "hits": [
      {
        "_id": "myIndex#myCollection",
        "_index": "%kuzzle",
        "_score": 1,
        "_source": {
          "collection": "myCollection",
          "index": "myIndex",
          "validation": {
            "fields": {
              "fieldName": {
                "defaultValue": "a default value",
                "mandatory": true,
                "multivalued": {
                  "maxCount": 5,
                  "minCount": 1,
                  "value": true
                },
                "type": "string",
                "typeOptions": {
                  "length": {
                    "max": 12,
                    "min": 2
                  }
                }
              }
            },
            "strict": true
          }
        },
        "_type": "validations"
      }
    ],
    "total": <number of specifications>
  }
}
```

Allows to search in the persistence layer for collection specifications.

Optional arguments:

* `size` controls the maximum number of documents returned in the response
* `from` is usually used with the `size` argument, and defines the offset from the first result you want to fetch
* `scroll` allows to fetch large result sets, and it must be set with a [time duration](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units). If set, a forward-only cursor will be created (and automatically destroyed at the end of the set duration), and its identifier will be returned in the `scrollId` property, along with the first page of results. This cursor can then be moved forward using the [`scrollSpecifications` API action](#scrollspecifications)


## truncate

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/<collection>/_truncate`  
>**Method:** `DELETE`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "truncate"
}
```

>**Response**

```litcoffee
{
  "status": 200,
  "error": null,
  "action": "truncate",
  "controller": "collection",
  "index": "<index>",
  "collection": "<collection>",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true,
  }
}
```

Empties a collection from all its documents, while keeping any associated mapping.  
It is also faster than deleting all documents from a collection using a query.


## updateMapping

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/<collection>/_mapping`  
>**Method:** `PUT`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // Data mapping using ElasticSearch mapping syntax
  "properties": {
    "field1": {
      "type": "field type",
      "other": "...options..."
    },
    "field2": {
      "type": "field type",
      "other": "...options..."
    },
    ...
    "fieldn": {
      "type": "field type",
      "other": "...options..."
    }
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "updateMapping",

  // Data mapping using ElasticSearch mapping syntax
  "body": {
    "properties": {
      "field1": {
        "type": "field type",
        "...options..."
      },
      "field2": {
        "type": "field type",
        "...options..."
      },
      ...
      "fieldn": {
        "type": "field type",
        "...options..."
      }
    }
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "action": "updateMapping",
  "controller": "collection",
  "requestId": "<unique request identifier>",
  "result": {}
}
```

When creating a new data `collection` in the persistent data storage layer, Kuzzle uses a default mapping.

It means that, by default, you won't be able to exploit the full capabilities of our
persistent data storage layer (currently handled by [ElasticSearch](https://www.elastic.co/products/elasticsearch)),
and your searches may suffer from below-average performances, depending on the amount of data you
stored in a collection and the complexity of your database.

To solve this matter, Kuzzle's API offers a way to create data mapping and to expose the entire
[mapping capabilities of ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html).


## updateSpecifications

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_specifications`  
>**Method:** `PUT`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  "myindex": {
    "mycollection": {
      "strict": <true|false>,
      "fields": {
        // ... specification for each field
      }
    }
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "collection",
  "action": "updateSpecifications",

  // Data mapping using ElasticSearch mapping syntax
  "body": {
    "myindex": {
      "mycollection": {
        "strict": <true|false>,
        "fields": {
          // ... specification for each field
        }
      }
    }
  }

}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "action": "updateSpecifications",
  "controller": "collection",
  "result": {
    "myindex": {
      "mycollection": {
        "strict": <true|false>,
        "fields": {
          // ... specification for each field
        }
      }
    }
  }
}

{
  "status": 400,                      // There was an error on specification
  "action": "updateSpecifications",
  "controller": "collections",
  "error": {
    "_source": // ... given specifications,
    "message": {
      "description": // ...global error description,
      "details": // ... an array of detailed problem found,
      "valid": false // the specifications are not valid
    }
  },
  "volatile": {},
  "result": {
    "myindex": {
      "mycollection": {
        "strict": <true|false>,
        "fields": {
          "myField": {
             // ... specification with an error
          }
        }
      }
    }
  }
}
```

You can specify validation specifications in order to enforce your own rules over documents and real-time messages.
Whenever a document is stored or updated, or a message is published, Kuzzle applies these specifications to check if the new data complies to the defined rules. If not, the document or message will be rejected along with an appropriate error message.
This method allows you to specify or update the validation specifications. You can both use it to create or update validation specifications for one index/collection couple or more.
When the validation specification is not well formatted, a detailed error message is answered by Kuzzle to help you to debug.


## validateSpecifications

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_validateSpecifications`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  "myindex": {
    "mycollection": {
      "strict": <true|false>,
      "fields": {
        // ... specification for each field
      }
    }
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "admin",
  "action": "updateSpecifications",

  // Data mapping using ElasticSearch mapping syntax
  "body": {
    "myindex": {
      "mycollection": {
        "strict": <true|false>,
        "fields": {
          // ... specification for each field
        }
      }
    }
  }

}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "action": "updateMapping",
  "controller": "admin",
  "state": "done",
  "requestId": "<unique request identifier>",
  "result": {
    "valid": <true|false>,
    "details": [ // it some errors have been found
      // each spotted errors
    ],
    "description": "<string>" // global description if validation fails
  }
}
```

You can specify validation specifications in order to enforce your own rules over documents and real-time messages.
Whenever a document is stored or updated, or a message is published, Kuzzle applies these specifications to check if the new data complies to the defined rules. If not, the document or message will be rejected along with an appropriate error message.
This method checks if a validation specification is well-formed. It does not store nor modify in any way the existing specifications database.
When the validation specification is not well formatted, a detailed error message is answered by Kuzzle to help you to debug.
