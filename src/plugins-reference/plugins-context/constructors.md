---
layout: full.html
algolia: true
title: constructors
order: 200
---

# constructors

---

## `BaseValidationType`

{{{since "1.0.0"}}}

The `BaseValidationType` constructor provides a base to create your own validation types.
It provides a common structure for all validation types in Kuzzle Backend.

You can find an example of a type creation in the Kuzzle Backend 
[source code](https://github.com/kuzzleio/kuzzle/blob/master/lib/api/core/validation/types/type.js.template).

---

## `Dsl`

{{{since "1.0.0"}}}

The DSL constructor provided in the plugin context can be used to access [Kuzzle Backend DSL capabilities]({{ site_base_path }}kuzzle-dsl).  
It can be used to manage filters and test data to get a list of matching filters.

Each plugin can instantiate its own DSL sandbox instance:

```js
const dsl = new context.constructors.Dsl();
```

The DSL exposes the following methods:

#### `exists`

{{{since "1.0.0"}}}

Returns a boolean indicating if filters exist for an index-collection pair.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`index`|`string`| Data index name |
|`collection`|`string`| Data collection name |


**Returns**

Returns `true` if at least one filter exists in the provided index-collection pair, returns `false` otherwise.

#### `getFilterIds`

{{{since "1.0.0"}}}

Retrieves filter IDs registered on an index-collection pair.


**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`index`|`string`| Data index name |
|`collection`|`string`| Data collection name |

**Returns**

An `array` of `filterId` corresponding to filters registered on an index-collection pair.

#### `normalize`

{{{since "1.1.0"}}}

Returns a promise that resolves if the provided filters are properly formatted.  
The resolved object is a normalized and optimized version of the supplied filters, along with the corresponding Room unique identifier.

This method does not modify the DSL storage. To register the filters, the [store]({{ site_base_path }}plugins-reference/plugins-context/constructors/#store) method must be called afterwards.  
If you do not need the Room unique identifier prior to store the DSL filters, then consider using [register]({{ site_base_path }}plugins-reference/plugins-context/constructors/#register) instead.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`index`|`string`| Data index name |
|`collection`|`string`| Data collection name |
|`filters`|`object`| Filters in [Kuzzle Backend DSL]({{ site_base_path }}kuzzle-dsl) format |

**Returns**

A `promise` that resolves to an object containing the following attributes:

* `index`: data index name
* `collection`: data collection name
* `normalized`: an object containing the optimized version of the supplied filters
* `id`: the room unique identifier


#### `register`

{{{since "1.0.0"}}}

Registers a filter to the DSL. This method is equivalent to executing [normalize]({{ site_base_path }}plugins-reference/plugins-context/constructors/#normalize) + [store]({{ site_base_path }}plugins-reference/plugins-context/constructors/#store).

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`index`|`string`| Data index name |
|`collection`|`string`| Data collection name |
|`filters`|`object`| Filters in [Kuzzle Backend DSL]({{ site_base_path }}kuzzle-dsl) format |

**Returns**

A `promise` that resolves to an object containing the following attributes:

* `id`: the filter unique identifier
* `diff`: `false` if the filter already exists in the engine. Otherwise, contains an object with the canonical version of the provided filters

#### `remove`

{{{since "1.0.0"}}}

Removes all references to a given filter from the DSL

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`filterId`|`string`| Filter unique ID. Obtained by using `register`|

**Returns**

A `promise` resolved once the filter has been completely removed from the DSL

#### `store`

{{{since "1.1.0"}}}

Stores normalized filters (obtained with [normalize]({{ site_base_path }}plugins-reference/plugins-context/constructors/#normalize)) in the DSL storage.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`normalized`|`Object`| Normalized filters |

**Returns**

An `Object` containing the following attributes:

* `id`: the filter unique identifier
* `diff`: `false` if the filter already existed in the engine. Otherwise, contains an object with the canonical version of the provided filters

#### `test`

{{{since "1.0.0"}}}

Test data against filters registered in the DSL, returning matching filter IDs, if any.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`index`|`string`| Data index name |
|`collection`|`string`| Data collection name |
|`data`|`object`| Data to test against filters |
|`documentId`|`string`| If applicable, document unique ID |


**Returns**

An array of `filterId` matching the provided data (and/or documentId, if any).

#### `validate`

{{{since "1.0.0"}}}

Tests the provided filters without storing them in the system, to check whether they are properly formatted or not.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`filters`|`object`| Filters in [Kuzzle Backend DSL]({{ site_base_path }}kuzzle-dsl) format |

**Returns**

A resolved promise if the provided filters are valid, or a rejected one with the appropriate error object.

---

## `Repository`

{{{since "1.0.0"}}}

The Repository constructor provided in the plugin context gives access to methods
that allow the plugin to interact with its plugin storage. The plugin storage is a dedicated
index in Elasticsearch where the plugin can [create collections]({{ site_base_path }}plugins-reference/plugins-context/accessors/#createcollection).
To do so, the plugin should first [bootstrap]({{ site_base_path }}plugins-reference/plugins-context/accessors/#bootstrap) the index. Once done, the plugin can instantiate repositories to interact with the different collections it created.


**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `collection` | `string` | The collection linked to the repository |
| `ObjectConstructor` |`constructor function` | (optional) Will be used as constructor for the fetched documents instead of `Object` |


**Usage**

Each plugin can instantiate its own repositories linked to its own storage sandbox:

```js
function ObjectConstructor() {
  this.someProperty = 'someValue';
}

var someCollectionRepository = new context.constructors.Repository('someCollection', ObjectConstructor);
```

The Repository exposes the following methods:

#### `create`

{{{since "1.0.0"}}}

Creates a document in the plugin storage.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`document`|`Object`| The document you want to create. It must contain a unique `_id` string property. You don't need to worry about collisions with other plugins as your plugin storage is only accessible by your plugin |
|`options`|`Object`| Optional arguments |

If a raw `options` object is provided, it may contain:

| Name | Type | Description                      |
|------|------|----------------------------------|
| `refresh` | `string` | Value can only be `wait_for` if provided. See [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/docs-refresh.html) for more information. |

**Returns**

Returns a `promise` that resolves to an object respresentation of Elasticsearch request result.

**Usage**

```js
someCollectionRepository.create({
  _id: '<a unique id>',
  someField: 'some content',
  anotherField: 'another content',
  ...
})
  .then(result => {
    console.log(result);
  });

/**
 * Outputs:
 * { _index: '%some-plugin',
 *   _type: 'someCollection',
 *   _id: '<a unique id>',
 *   _version: 1,
 *   result: 'created',
 *   _shards: { total: 2, successful: 1, failed: 0 },
 *   created: true,
 *   _source: { someField: 'some content', anotherField: 'another content' } }
 */
```

<aside class="warning">
  The document provided as an argument should be a plain object representing the document you want to store.
</aside>

#### `createOrReplace`

{{{since "1.0.0"}}}

Creates or replaces a document in the plugin storage.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`document`|`object`| The document you want to create or replace. It must contain a unique `_id` string property. You don't need to worry about collisions with other plugins as your plugin storage is only accessible by your plugin |
|`options`|`Object`| Optional arguments |

If a raw `options` object is provided, it may contain:

| Name | Type | Description                      |
|------|------|----------------------------------|
| `refresh` | `string` | Value can only be `wait_for` if provided. See [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/docs-refresh.html) for more information. |

**Returns**

Returns a `promise` that resolves to an object representation of Elasticsearch request result (see [create usage]({{ site_base_path }}plugins-reference/plugins-context/constructors/#create)).

**Usage**

```js
someCollectionRepository.createOrReplace({
  _id: '<a unique id>',
  someField: 'some content',
  anotherField: 'another content',
  ...
});
```

<aside class="warning">
  The document provided as an argument should be a plain object representing the document you want to store.
</aside>

#### `delete`

{{{since "1.0.0"}}}

Deletes a document from the plugin storage.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`document`|`object`| The document `_id` of the document you want to delete. |
|`options`|`Object`| Optional arguments |

If a raw `options` object is provided, it may contain:

| Name | Type | Description                      |
|------|------|----------------------------------|
| `refresh` | `string` | Value can only be `wait_for` if provided. See [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/docs-refresh.html) for more information. |

**Returns**

Returns a `promise` that resolves to an array of objects which is a representation of the Elasticsearch request result.

**Usage**

```js
someCollectionRepository.delete('someDocumentId')
  .then(result => {
    console.log(result);
  });

/**
 * Outputs:
 *  [ { found: true,
 *    _index: '%some-plugin',
 *    _type: 'someCollection',
 *    _id: '<a unique id>',
 *    _version: 3,
 *    result: 'deleted',
 *    _shards: { total: 2, successful: 1, failed: 0 } } ]
 */
```

#### `get`

{{{since "1.0.0"}}}

Retrieves a document from the plugin storage.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`documentId`|`string`| The document identifier of the document you want to retrieve. |

**Returns**

Returns a `promise` that resolves to an `Object` or an `ObjectConstructor` if provided in the constructor.

**Usage**

```js
someCollectionRepository.get('someDocumentId', 'someCollection');
```

#### `mGet`

{{{since "1.0.0"}}}

Retrieves multiple documents from the plugin storage.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`documentIds`|`array<string>`| An array of document identifier of the documents you want to retrieve. |

**Returns**

Returns a `promise` that resolves to an array of `Object` or `ObjectConstructor` if provided in the constructor.

**Usage**

```js
someCollectionRepository.mGet(['someDocumentId', 'anotherDocument']);
```

#### `replace`

{{{since "1.0.0"}}}

Replaces a document in the plugin storage.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`document`|`object`| The content of the document. It must contain a unique `_id` string property. |
|`options`|`Object`| Optional arguments |

If a raw `options` object is provided, it may contain:

| Name | Type | Description                      |
|------|------|----------------------------------|
| `refresh` | `string` | Value can only be `wait_for` if provided. See [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/docs-refresh.html) for more information. |

**Returns**

Returns a `promise` that resolves to an object respresentation of Elasticsearch request result (see [create usage]({{ site_base_path }}plugins-reference/plugins-context/constructors/#create)).

**Usage**

```js
someCollectionRepository.replace({
  _id: '<a unique id>',
  someField: 'some content',
  anotherField: 'another content',
  ...
});
```

<aside class="warning">
  The document provided as an argument should be a plain object representing the document you want to store.
</aside>

#### `search`

{{{since "1.0.0"}}}

Searches documents that match the provided `query` in the collection.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`query`|`object`| The [query]({{ site_base_path }}elasticsearch-cookbook/basic-queries) sent to Elastisearch. |
|`from`|`integer`| Provides the offset of the returned documents. |
|`size`|`integer`| Provides the count of the returned documents. |

**Returns**

Returns a `promise` that resolves to an object of the form `{total: number, hits: array<object>}` where `hits`
contains an array of `Object` or `ObjectConstructor` if provided in the constructor and `total` the count of documents that match the query.

**Usage**

```js
someCollectionRepository.search({
  query: {
    match_all: {}
  }
}, 0, 10);
```

#### `update`

{{{since "1.0.0"}}}

Updates a document in the plugin storage. You can provide a partial document to add or update one or more fields.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`document`|`object`| The partial content of the document. It must contain a unique `_id` string property. |
|`options`|`Object`| Optional arguments |

If a raw `options` object is provided, it may contain:

| Name | Type | Description                      |
|------|------|----------------------------------|
| `refresh` | `string` | Value can only be `wait_for` if provided. See [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/docs-refresh.html) for more information. |

**Returns**

Returns a `promise` that resolves to an object which is a representation of the Elasticsearch request result.

**Usage**

```js
someCollectionRepository.update({
  _id: '<a unique id>',
  anotherField: 'changed content'
});
/**
 * Outputs:
 * { _index: '%some-plugin',
 *   _type: 'someCollection',
 *   _id: '<a unique id>',
 *   _version: 2,
 *   result: 'updated',
 *   _shards: { total: 0, successful: 0, failed: 0 } }
 */
```

---

## `Request`

{{{since "1.0.0"}}}

This constructor is used to transform an [API call]({{ site_base_path }}api-documentation/query-syntax/common-attributes) into a standard Kuzzle Backend request. This object is updated along the request process to reflect the current state of the request, and is ultimately used to serialize a standard Kuzzle Backend [response]({{ site_base_path }}api-documentation/kuzzle-response).

Network protocol specific headers can be added to the response. If the protocol can handle them,
these headers will be used to configure the response sent to the client.    
As Kuzzle Backend supports the HTTP protocol natively, this object handles HTTP headers special cases.
Other network protocols headers are stored in raw format, and protocol plugins need to handle
their own specific headers manually.

For more information about this object, please refer to [our detailed documentation](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#request).

#### Constructors

**`new Request(<request object>, <data>, [options])`**

{{{since "1.0.0"}}}

| Name | Type | Description                      |
|------|------|----------------------------------|
|`request`|`Request`| `Request` object used to derive a new request object instance |
|`data`|`object`| JSON object following the same standard than for non-HTTP [API calls]({{ site_base_path }}api-documentation/query-syntax)<br>See the  [RequestInput](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestinput) constructor for more information |
| `options` | `object` | Optional initialization parameters |

This constructor creates a new `Request` object from the provided one, and then adds the supplied data to complete the new object.  

This constructor is particularly useful when a plugin needs to execute an API request derived from a user request, as most of the relevant information will be copied over to the new object.

Properties that are automatically copied to the new object:

* All resource properties: `_id`, `collection`, `index`
* Additional arguments: `request.input.args`
* JSON Web Token, if any

Example:

```js
const derivedRequest = new context.constructors.Request(request, {
  controller: 'document',
  action: 'create',
  body: {
    document: 'content'
  }
});
```

**`new Request(<data>, [options])`**

{{{since "1.2.0"}}}

| Name | Type | Description                      |
|------|------|----------------------------------|
|`data`|`object`| JSON object following the same standard than for non-HTTP [API calls]({{ site_base_path }}api-documentation/query-syntax)<br>See the  [RequestInput](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestinput) constructor for more information |
| `options` | `object` | Optional initialization parameters |

This constructor can be used to create a new `Request` object without the need to provide a source.

The provided `data` object must contain a lot more information than what's needed by the constructor method described above, so if a `Request` object is available to your method, you should probably use it to instantiate one of these objects.

Example:

```js
const request = new context.constructors.Request({
  controller: 'document',
  action: 'create',
  index: 'index',
  collection: 'collection',
  _id: 'documentId',
  body: {
    document: 'content'
  }
});
```

**The "options" parameter**

If a raw `options` object is provided to one of the `Request` constructors (see above), then it may contain the following properties:

| Name | Type | Description                      |
|------|------|----------------------------------|
| `connectionId` | `string` | Passed to [RequestContext](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestcontext) constructor |
| `error` | `KuzzleError` or `Error` | Invokes [setError](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#seterrorerror) at initialization |
| `protocol` | `string` | Passed to [RequestContext](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestcontext) constructor |
| `requestId` | `string` | Initializes the `id` property |
| `result` | *(varies)* | Invokes [setResult](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#setresultresult-options--null) at initialization |
| `status` | `integer` | HTTP error code |
| `token` | `object` | Passed to [RequestContext](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestcontext) constructor |
| `user` | `object` | Passed to [RequestContext](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestcontext) constructor |

#### Attributes

Read-only

| Name | Type | Description                      |
|------|------|----------------------------------|
| `timestamp` | integer | Request creation timestamp |

Writable

| Name | Type | default | Description                      |
|------|------|---------|----------------------------------|
| `id` | `string` | Auto-generated UUID | Request unique identifier |
| `status` | `integer` | `102` | HTTP status code |

Any undefined attribute from the list above will be set to null.

Please refer to our [API Documentation]({{ site_base_path }}api-documentation) for a complete list of controller actions and their usage.

Getters

| Name | Type | Description                      |
|------|------|----------------------------------|
| `context` | `RequestContext` | [RequestContext](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestcontext) object | Request connection context |
| `error` | `KuzzleError` | `null` | Request error, if any |
| `input` | `RequestInput` | [RequestInput](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestinput) object | Request's parameters |
| `response` | `RequestResponse` | Response view of the request, standardized as the expected [Kuzzle Backend API response]({{ site_base_path }}api-documentation/kuzzle-response) |
| `result` | *(varies)* | `null` | Request result, if any |


#### `response.getHeader`

{{{since "1.0.0"}}}

Returns the value registered for the response header `name`

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `name` | `string` | Header name |

#### `response.removeHeader`

{{{since "1.0.0"}}}

Removes header `name` from the response headers.

#### `setHeader`

{{{since "1.0.0"}}}

Adds a header `name` with value `value` to the response headers.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `name` | `string` | Header name |
| `value` | `string` | Header value |

For standard headers, if `name` already exists, then the provided `value` will be concatenated
to the existing value, separated by a comma.  

As Kuzzle Backend implements HTTP natively, this behavior changes for some HTTP specific headers
to comply with the norm. For instance, `set-cookie` values are amended in an array, and other headers like `user-agent` or `host` can store only 1 value.


#### `serialize`

{{{since "1.0.0"}}}

Serializes the `Request` object into a pair of POJOs that can be sent across the network, and then used to rebuild another equivalent `Request` object.


```js
let foo = request.serialize();
let bar = new context.constructors.Request(request, foo.data, foo.options);
```

#### `setError`

{{{since "1.0.0"}}}

Adds an error to the request, and sets the request's status to the error one.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `error` | `KuzzleError` or `Error` | Error object to set |

If a `KuzzleError` is provided, the request's status attribute is set to the error one.

Otherwise, the provided error is encapsulated into an [InternalError](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#errorsinternalerror) object, and the request's status is set to 500.

#### `setResult`

{{{since "1.0.0"}}}

Sets the request result.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `result` | *(varies)* | Request's result |
| `options` | `object` | Optional parameters |

The `options` argument may contain the following properties:

| Name | Type | Description                      | Default |
|------|------|----------------------------------|---------|
| `status` | `integer` | HTTP status code | `200` |
| `headers` | `object` | Protocol specific headers | `null` |
| `raw` | `boolean` | Asks Kuzzle Backend to send the provided result directly, instead of encapsulating it in a Kuzzle Backend JSON response | `false` |
