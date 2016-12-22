# ~ collection controller


## create

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<data index>/<collection name>`  
>**Method:** `PUT`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<data index>",
  "collection": "<collection name>",
  "controller": "collection",
  "action": "create"
}
```

>Response

```litcoffee
{
  "status": 200,
  "error": null,
  "index": "<data index>",
  "collection": "<collection name>",
  "controller": "collection",
  "action": "create",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  }
}
```

When creating a document, Kuzzle will automatically create a data collection if needed.
But in some cases, you may want to create an empty collection directly, prior to storing any document in it.  
This method does nothing if the collection already exists.


## deleteSpecifications

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<data index>/<data collection>/_specifications`  
>**Method:** `DELETE`

<section class="others"></section>

>Query

<section class="others"></section>
```litcoffee
{
  index: "<data index>",
  collection: "<data collection>",
  controller: "collection",
  action: "deleteSpecifications",
}
```

>Response

```litcoffee
{
  status: 200,                      // Assuming everything went well
  error: null,                      // Assuming everything went well
  index: "<data index>",
  collection: "<data collection>",
  action: "deleteSpecifications",
  controller: "collection",
  result: {}
}
```

Deletes the validation specification set for the <data index>/<data collection>.
It responds 200 even there where no validation specification manually set before.

***Note:*** by default, an empty specification is implicitally applied to all collections which. In a way, "no specification set" means "all documents are valid". This is why, using this route when no specifications have been set before, does not produce an error.


## exists

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<data index>/<data collection>/_exists`  
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<data index>",
  "collection": "<data collection>",
  "controller": "collection",
  "action": "exists"
}
```

> Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<data index>",
  "collection": "<data collection>",
  "controller": "exists",
  "action": "exists",
  "requestId": "<unique request identifier>",
  "result": true
}
```

Check if a collection exists in Kuzzle database storage layer.


## getMapping

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<data index>/<data collection>/_mapping`  
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<data index>",
  "collection": "<data collection>",
  "controller": "collection",
  "action": "getMapping"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<data index>",
  "collection": "<data collection>",
  "controller": "collection",
  "action": "getMapping",
  "requestId": "<unique request identifier>",
  "result": {
    "mainindex": {
      "mappings": {
        <data collection>: {

          // Data mapping using ElasticSearch mapping syntax
          "properties": {
            "field1": {type: "field type", ...options... },
            "field2": {type: "field type", ...options... },
            ...
            "fieldn": {type: "field type", ...options... },
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

>**URL:** `http://kuzzle:7511/<data index>/<data collection>/_specifications`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  index: "<data index>",
  collection: "<data collection>",
  controller: "collection",
  action: "getSpecifications",
}
```

>Response

```litcoffee
{
  status: 200,                      // Assuming everything went well
  error: null,                      // Assuming everything went well
  action: "getSpecifications",
  controller: "collection",
  collection: "<data collection>",
  index: "<data index>",
  result: {
    collection: "<data collection>",
    index: "<data index>",
    validation": {
      fields: {
        myField: {
          defaultValue: 42,
          mandatory: true,
          type: "integer"
        }
        ...
      },
      strict: true
    }
  }
}

{
  status: 404,                      // No validation specification has been set for this index/collection
  error: {
    _source: {
      body: {}
    },
    message: "Not Found"
  },
  action: "getSpecifications",
  controller: "collection",
  index: "<data index>",
  collection: "<data collection>"
  result: null
}
```

This command allows getting the validation specifications associated to the given index and collection if some specifications has been defined first


## list

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<data index>/_list(/<all|stored|realtime>)[?from=0][&size=42]`  
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<data index>",
  "controller": "collection",
  "action": "list",
  "type": "<all|stored|realtime>",
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
  "index": "<data index>",
  "controller": "collection",
  "action": "list",
  "requestId": "<unique request identifier>",
  "result": {
    "collections": [
      {
        "name": "realtime_1",
        "type": "realtime"
      },
      {
        "name": "realtime_2",
        "type": "realtime"
      },
      {
        "name": "realtime_...",
        "type": "realtime"
      },
      {
        "name": "realtime_n", type: "realtime"
      },
      {
        "name": "stored_1", type: "stored"
      },
      {
        "name": "stored_2", type: "stored"
      },
      {
        "name": "stored_...", type: "stored"
      },
      {
        "name": "stored_n", type: "stored"
      }
    ],
    "type": "all"
  }
}
```

Return the complete list of realtime and stored data collections in requested index sorted by name in alphanumerical order.  
The `type` argument filters the returned collections. Allowed values: `all`, `stored` and `realtime` (default : `all`).  
The `from` and `size` arguments allow pagination. They are returned in the response if provided.


## truncate

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<data index>/<collection name>/_truncate`  
>**Method:** `DELETE`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<data index>",
  "collection": "<data collection>",
  "controller": "collection",
  "action": "truncate"
}
```

>Response

```litcoffee
{
  "status": 200,
  "error": null,
  "action": "truncate",
  "controller": "collection",
  "index": "<data index>",
  "collection": "<data collection>",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true,
  }
}
```

This method empties a collection from all its documents, while keeping any associated mapping.  
It is also faster than deleting all documents from a collection using a query.


## updateMapping

<section class="http"></section>

>**URL:** `http://kuzzle:7511/<data index>/<data collection>/_mapping`  
>**Method:** `PUT`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // Data mapping using ElasticSearch mapping syntax
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
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<data index>",
  "collection": "<data collection>",
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

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<data index>",
  "collection": "<data collection>",
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
[mapping capabilities of ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/2.3/mapping.html).


## updateSpecifications

<section class="http"></section>

>**URL:** `http://kuzzle:7511/_specifications`  
>**Method:** `PUT`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  myindex: {
    mycollection: {
      strict: <true|false>,
      fields: {
        // ... specification for each field
      }
    }
  }
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  controller: "collection",
  action: "updateSpecifications",

  // Data mapping using ElasticSearch mapping syntax
  body: {
    myindex: {
      mycollection: {
        strict: <true|false>,
        fields: {
          // ... specification for each field
        }
      }
    }
  }

}
```

>Response

```litcoffee
{
  status: 200,                      // Assuming everything went well
  error: null,                      // Assuming everything went well
  index: "<data index>",
  collection: "<data collection>",
  action: "updateSpecifications",
  controller: "collection",
  result: {
    myindex: {
      mycollection: {
        strict: <true|false>,
        fields: {
          // ... specification for each field
        }
      }
    }
  }
}

{
  status: 400,                      // There was an error on specification
  action: "updateSpecifications",
  controller: "collections",
  error: {
    _source: // ... given specifications,
    message: {
      description: // ...global error description,
      details: // ... an array of detailed problem found,
      valid: false // the specifications are not valid
    }
  },
  metadata: {},
  result: {
    myindex: {
      mycollection: {
        strict: <true|false>,
        fields: {
          myField: {
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

>**URL:** `http://kuzzle:7511/_validateSpecifications`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  myindex: {
    mycollection: {
      strict: <true|false>,
      fields: {
        // ... specification for each field
      }
    }
  }
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  controller: "admin",
  action: "updateSpecifications",

  // Data mapping using ElasticSearch mapping syntax
  body: {
    myindex: {
      mycollection: {
        strict: <true|false>,
        fields: {
          // ... specification for each field
        }
      }
    }
  }

}
```

>Response

```litcoffee
{
  status: 200,                      // Assuming everything went well
  error: null,                      // Assuming everything went well
  index: "<data index>",
  collection: "<data collection>",
  action: "updateMapping",
  controller: "admin",
  state: "done",
  requestId, "<unique request identifier>",
  result: {
    valid: <true|false>,
    details: [ // it some errors have been found
      // each spotted errors
    ],
    description: <string> // global description if validation fails
  }
}
```

You can specify validation specifications in order to enforce your own rules over documents and real-time messages.
Whenever a document is stored or updated, or a message is published, Kuzzle applies these specifications to check if the new data complies to the defined rules. If not, the document or message will be rejected along with an appropriate error message.
This method checks if a validation specification is well-formed. It does not store nor modify in any way the existing specifications database.
When the validation specification is not well formatted, a detailed error message is answered by Kuzzle to help you to debug.
