---
layout: full.html
algolia: true
title: accessors
order: 100
---

# accessors

<aside class="notice">
<a href="{{ site_base_path }}plugins-reference/plugins-features/adding-hooks/#executing-hooks-in-separate-threads">Plugins executed on separate threads</a> don't have access to accessors.
</aside>

---

## `execute`

Sends a request to [Kuzzle API]({{ site_base_path }}api-documentation).

### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
| `request` | `Request` | A [`Request`]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) to execute  |
| `callback(error, request)` | `Function` | Function executed with the request's result |

**Note:** when `callback` is invoked, the `request` argument is ALWAYS filled, even when there is an error.
This argument is the provided request, with its `result` and/or `error` parts filled.
To obtain the standardized Kuzzle response from it, simply use the getter `request.response`.

### Usage

```js
let
  derivedRequest = new context.constructors.Request(request, {
    index: 'index',
    collection: 'collection',
    controller: 'read',
    action: 'get',
    _id: 'documentID'
  });

context.accessors.execute(request, (error, request) => {
  /*
   Kuzzle's response can be obtained with request.response

   See Request constructor documentation for more information
   */
});
```

---

## `router.newConnection`

Declares a new connection for a given protocol.  

### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`protocolName`|`string`|Protocol name, used for Kuzzle internal statistics |
|`connectionUniqueId`|`string`|Unique ID identifying the user connection|

### Returns

A `promise` resolving to a `RequestContext` object. This object is needed for other router methods.

---

## `router.execute`

Forward a request to Kuzzle.

### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`request`|`Request`| An user request wrapped as a `Request` instance|
|`callback`|`function`| Callback called with the request corresponding results |

### Callback

The callback is invoked once the request has been processed by Kuzzle.  
The provided callback is resolved with a `response` argument, which is a plain-object, representing a standardized [Kuzzle response]({{ site_base_path }}api-documentation/kuzzle-response).

---

## `router.removeConnection`

Removes a connection from the connection pool maintained by Kuzzle.  
Not calling this method after a connection is dropped will result in a memory-leak.

### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`context`|`RequestContext`| Object identifying the connection context. Obtained by calling `newConnection()`|


---

## `storage.bootstrap`

Allows to initialize the plugin storage index in Elasticsearch. When called, it will create the Elastisearch index
and the `collections` provided in argument. Can be called at each plugin initialized as long as the mapping is
not modified.

### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`collections`|`Object`| An object that contains the collection mappings. See the [guide]({{ site_base_path }}guide/essentials/persisted/#document-mapping) for more explanation about Elasticsearch mapping. |

### Returns

Returns a `promise` that resolves to a `boolean` that indicates if the index and the collections already existed or not.

### Usage

```js
context.accessors.storage.bootstrap({
  someCollection: {
    properties: {
      someField: {
        type: 'keyword'
      }
      ,
      ...
    }
  },
  anotherCollection: {
    properties: {
      ...
    }
  }
});
```

---

## `storage.createCollection`

Allows to create a collection with its mapping. Can be called at each plugin initialization if the mapping is not
 modified. Consider using [`storage.bootstrap`]({{ site_base_path }}plugins-reference/plugins-context/accessors/#storage-bootstrap) if your collections are not dynamic.

### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`collection`|`string`| The collection name |
|`collectionMapping`|`object`| The collection mapping |

### Returns

Returns a `promise` that resolves to the object `{ acknowledged: true }`.

### Usage

```js
context.accessors.storage.createCollection('someCollection', {
    properties: {
      someField: {
        type: 'keyword'
      }
      ,
      ...
    }
});
```

---

## `validation.validate`

Validates a document wrapped in a `Request` object.

### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`request`|`Request`| A document wrapped as a `Request` object |
|`verbose`|`boolean`| Defines the behavior of the validation |

### Returns

If `verbose` is set to `false`:

Returns a `promise` that resolves to a modified `Request` instance where `defaultValues` are applied. Rejects if validation fails.

If `verbose` is set to `true`:

Returns a `promise` that resolves to an `object`:

```js
{
  errorMessages: ...,
  validation: ...
}
```

Where:

* `errorMessages` is a structured javascript object reflecting the structure of the document with all errors collected during the validation process
* `validation` is a `boolean` reflecting the validation state.

---

## `validation.addType`

### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`validationType`|`object`| An object instance of a validation type |

### Returns

Nothing. Can throw a `PluginImplementationError` if the validation type has not the expected form.

### validationType form

```js
/**
 * @typedef \{{
 *   validate: Function,
 *   validateFieldSpecification: Function,
 *   typeName: string,
 *   allowChildren: boolean,
 *   checkAllowedProperties: Function,
 *   allowedTypeOptions: string[]
 * }} ValidationType
 */
```

See constructor `BaseValidationType` for more details.
