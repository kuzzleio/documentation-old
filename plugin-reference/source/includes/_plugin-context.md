# The plugin context

The plugin context is an object containing a set of constructors, accessors and configurations, allowing plugins to interact with Kuzzle.

A plugin context is provided by Kuzzle to plugins when calling their `init` function.  
Each plugin receives its own plugin context instance.

Here is the list of shared objects contained in the provided ``context``:

| Attribute path | Purpose                      |
|----------------|------------------------------|
| `context.accessors.execute` | Access to Kuzzle API |
| `context.accessors.passport` | Access to Kuzzle [Passport](http://passportjs.org) instance. Allow [authentication plugins](/#gt-authentication-plugin) to register a new login strategy to Kuzzle. |
| `context.accessors.router` | Access to Kuzzle protocol communication system. Allow **protocol** plugins to interface themselves with Kuzzle. |
| `context.accessors.storage` | Initiate and configure to the plugin storage. This storage can only be accessed by the plugin and can be used to persist plugin datas. |
| `context.accessors.users` | Access to users management, especially useful for authentication plugins. Provides methods for handling users. This accessor is mainly used by authentication plugins. |
| `context.accessors.validation` | Access to validation mechanisms, useful to validate documents and add field types. |
| `context.config` | Contains the entire Kuzzle instance configuration (most of it coming from Kuzzle configuration file) |
| `context.constructors.Dsl` | Constructor allowing plugins to instantiate their own Kuzzle real-time engine instance |
| `context.constructors.Repository` | Constructor allowing plugins to instantiate their Repositories allowing them to interact with their plugin storage |
| `context.constructors.Request` | Constructor for standardized requests sent to Kuzzle |
| `context.constructors.BaseValidationType` | Constructor for the Validation Type base constructor |
| `context.errors.<ErrorConstructor>` |Kuzzle error constructors, built dynamically from available Kuzzle error objects at runtime |
| `context.log.<level>(message)` | Provides methods to log messages depending on their priority level |

**Note:** `context.accessors` are not available to [worker plugins](#gt-worker-plugins), as they are run in their own process(es), without access to Kuzzle instances.

## Accessor

<aside class="notice">
<a href="#executing-listeners-in-separate-threads">Plugins executed on separate threads</a> don't have access to accessors.
</aside>

### `execute`

Sends a request to [Kuzzle API](/api-reference).

#### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
| `request` | `Request` | A [`Request`](#request) to execute  |
| `callback(error, request)` | `Function` | Function executed with the request's result |

**Note:** when `callback` is invoked, the `request` argument is ALWAYS filled, even when there is an error.
This argument is the provided request, with its `result` and/or `error` parts filled.
To obtain the standardized Kuzzle response from it, simply use the getter `request.response`.

#### Usage

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

### `passport.use`

Implements [Passport `use()` method](http://passportjs.org/docs/configure)

#### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
| `strategy` | `Strategy object` | A Passport instantiated strategy object |

<aside class="notice">
  Passport strategy constructors take a "verify" callback.
  As the following example demonstrates, if the provided callback uses "this.[attribute]" attributes,
  then it's necessary to bind the provided callback to the plugin's context
</aside>

#### Usage

```js
var LocalStrategy = require('passport-local').Strategy;

function verify (username, password, done) {
  // verification code
  if (userVerified) {
    done(null, userInformation);
  }
  else {
    done(error);
  }
}

pluginContext.accessors.passport.use(new LocalStrategy(verify.bind(this)));
```

### `router.newConnection`

Declares a new connection for a given protocol.  

#### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`protocolName`|`string`|Protocol name, used for Kuzzle internal statistics |
|`connectionUniqueId`|`string`|Unique ID identifying the user connection|

#### Returns

A `promise` resolving to a `RequestContext` object. This object is needed for other router methods.

### `router.execute`

Forward a request to Kuzzle.

#### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`request`|`Request`| An user request wrapped as a `Request` instance|
|`callback`|`function`| Callback called with the request corresponding results |

#### Callback

The callback is invoked once the request has been processed by Kuzzle.  
The provided callback is resolved with a `response` argument, which is a plain-object, representing a standardized [Kuzzle response](/api-reference/#kuzzle-response).

### `router.removeConnection`

Removes a connection from the connection pool maintained by Kuzzle.  
Not calling this method after a connection is dropped will result in a memory-leak.

#### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`context`|`RequestContext`| Object identifying the connection context. Obtained by calling `newConnection()`|


### `storage.bootstrap`

Allows to initialize the plugin storage index in Elasticsearch. When called, it will create the Elastisearch index
and the `collections` provided in argument. Can be called at each plugin initialized as long as the mapping is
not modified.

#### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`collections`|`Object`| An object that contains the collection mappings. See the [guide](/guide#document-mapping) for more explanation about Elasticsearch mapping. |

#### Returns

Returns a `promise` that resolves to a `boolean` that indicates if the index and the collections already existed or not.

#### Usage

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

### `storage.createCollection`

Allows to create a collection with its mapping. Can be called at each plugin initialization if the mapping is not
 modified. Consider using [`storage.bootstrap`](#storage-bootstrap) if your collections are not dynamic.

#### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`collection`|`string`| The collection name |
|`collectionMapping`|`object`| The collection mapping |

#### Returns

Returns a `promise` that resolves to the object `{ acknowledged: true }`.

#### Usage

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

### `users.create`

Creates a new user in Kuzzle. Will return an error if the user already exists.

#### Arguments

| Name | Type | Default Value | Description                      |
|------|------|---------------|----------------------------------|
|`loginName`|`string`| | Name of the user's login to create |
|`userProfile`|`string`|`default`| [User profile](/guide/#permissions) |
|`userInfo`|`object`| `{}` | Misc. information about the user |

#### Returns

A `promise` resolving a `user` object containing the created information.

### `users.load`

Loads a user from Kuzzle

#### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`loginName`|`string`| Name of the user's login to load |

#### Returns

A `promise` resolving to a `user` object containing the user information.


### `validation.validate`

Validates a document wrapped in a `Request` object.

#### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`request`|`Request`| A document wrapped as a `Request` object |
|`verbose`|`boolean`| Defines the behavior of the validation |

#### Returns

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

### `validation.addType`

#### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`validationType`|`object`| An object instance of a validation type |

#### Returns

Nothing. Can throw a `PluginImplementationError` if the validation type has not the expected form.

#### validationType form

```js
/**
 * @typedef {{
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

## Constructor

### `BaseValidationType`

The `BaseValidationType` constructor provides a base to create your own validation types.
It provides a common structure for all validation types developped in Kuzzle.

You can find an example of a type creation in the
[Kuzzle source code](https://github.com/kuzzleio/kuzzle/blob/master/lib/api/core/validation/types/type.js.template).

### `Dsl`

The DSL constructor provided in the plugin context gives access to
[Kuzzle real-time filtering capabilities](#filtering-syntax).
It allows managing filters, and testing data to get a list of matching filters.

Each plugin can instantiate its own sandboxed DSL instance:

```js
var dsl = new context.constructors.Dsl();
```

The DSL exposes the following methods:

#### `exists`

Returns a boolean indicating if filters exist for an index-collection pair

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`index`|`string`| Data index name |
|`collection`|`string`| Data collection name |


**Returns**

Returns `true` if at least one filter exists on the provided index-collection pair, returns `false` otherwise

#### `getFilterIds`

Retrieves filter IDs registered on an index-collection pair


**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`index`|`string`| Data index name |
|`collection`|`string`| Data collection name |

**Returns**

An `array` of `filterId` corresponding to filters registered on an index-collection pair.

#### `register`

Registers a filter to the DSL.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`index`|`string`| Data index name |
|`collection`|`string`| Data collection name |
|`filters`|`object`| Filters in [Kuzzle DSL](#filtering-syntax) format |

**Returns**

A `promise` resolving to an object containing the following attributes:

* `id`: the filter unique identifier
* `diff`: `false` if the filter already existed in the engine. Otherwise, contains an object with the canonical version of the provided filters

#### `remove`

Removes all references to a given filter from the DSL

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`filterId`|`string`| Filter unique ID. Obtained by using `register`|

**Returns**

A `promise` resolved once the filter has been completely removed from the DSL

#### `test`

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

Tests the provided filters without storing them in the system, to check whether they are well-formed or not.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`filters`|`object`| Filters in [Kuzzle DSL](#filtering-syntax) format |

**Returns**

A resolved promise if the provided filters are valid, or a rejected one with the appropriate error object otherwise.

### `Repository`

The Repository constructor provided in the plugin context gives access to methods
that allow the plugin to interact with its plugin storage. The plugin storage is a dedicated
index in Elasticsearch where the plugin can [create collections](#storage-createcollection).
To do so the plugin should first [bootstrap](#storage-bootstrap) the index.

Once done, the plugin can instantiate repositories to interact with the different collections it created.


**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `collection` | `string` | The collection linked to the repository |
| `ObjectConstructor` |`constructor function` | (optional) Will be used as constructor for the fetched documents instead of `Object` |


**Usage**

Each plugin can instantiate its own repositories linked to its own sandboxed plugin storage:

```js
function ObjectConstructor() {
  this.someProperty = 'someValue';
}

var someCollectionRepository = new context.constructors.Repository('someCollection', ObjectConstructor);
```

The Repository exposes the following methods:

#### `create`

Creates a document in the plugin storage.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`document`|`Object`| The document you want to create. It must contain a unique `_id` string property. You don't need to worry about collisions with other plugins as your plugin storage is only accessible by your plugin |

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
  The document provided as argument should be a plain object representing the document you want to store.
</aside>

#### `createOrReplace`

Creates or replaces a document in the plugin storage.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`document`|`object`| The document you want to create or replace. It must contain a unique `_id` string property. You don't need to worry about collisions with other plugins as your plugin storage is only accessible by your plugin |

**Returns**

Returns a `promise` that resolves to an object respresentation of Elasticsearch request result (see [create usage](#create)).

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
  The document provided as argument should be a plain object representing the document you want to store.
</aside>

#### `delete`

Deletes a document from the plugin storage.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`document`|`object`| The document `_id` of the document you want to delete. |

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

Replaces a document in the plugin storage.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`document`|`object`| The content of the document. It must contain a unique `_id` string property. |

**Returns**

Returns a `promise` that resolves to an object respresentation of Elasticsearch request result (see [create usage](#create)).

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
  The document provided as argument should be a plain object representing the document you want to store.
</aside>

#### `search`

Searches documents that match the provided `query` in the collection.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`query`|`object`| The [query](/elasticsearch-cookbook/#basic-queries) sent to Elastisearch. |
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

Updates a document in the plugin storage. You can provide a partial document to add or update one or more fields.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`document`|`object`| The partial content of the document. It must contain a unique `_id` string property. |

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

### `Request`

This constructor is used to transform an [API call](/api-reference/?others#common-attributes) into a standardized Kuzzle request. This object is updated along the request process to reflect the current state of the request, and is ultimately used to serialize a standard [Kuzzle response](/api-reference/?others#kuzzle-response) to be forwarded to the requesting client.

Network protocol specific headers can be added to the response. If the protocol can handle them,
these headers will be used to configure the response sent to the client.    
As Kuzzle supports the HTTP protocol natively, this object handles HTTP headers special cases.
Other network protocols headers are stored in raw format, and protocol plugins need to handle
their own specific headers manually.

For more information about this object, please check [our detailed documentation](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#request).

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`request`|`Request`| `Request` object used to derive a new object instance |
|`data`|`object`| JSON object following the same standard than for non-HTTP [API calls](http://docs.kuzzle.io/api-reference/#query-syntax)<br>See the  [RequestInput](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestinput) constructor for more information |
| `options` | `object` | Optional initialization parameters |

If a raw `options` object is provided, it may contain:

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


Here is an example:

```js
let derivedRequest = new context.constructors.Request(request, {
  controller: 'write',
  action: 'create',
  index: 'foo',
  collection: 'bar',
  _id: 'some document ID',
  body: {
    document: 'content'
  },
  metadata: {
    some: 'volatile data'
  }
});
```

**Attributes**

Read-only

| Name | Type | Description                      |
|------|------|----------------------------------|
| `timestamp` | integer | Request creation timestamp |

Writable

| Name | Type | default | Description                      |
|------|------|---------|----------------------------------|
| `context` | `RequestContext` | [RequestContext](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestcontext) object | Request connection context |
| `error` | `KuzzleError` | `null` | Request error, if any |
| `id` | `string` | Auto-generated UUID | Request unique identifier |
| `input` | `RequestInput` | [RequestInput](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestinput) object | Request's parameters |
| `result` | *(varies)* | `null` | Request result, if any |
| `status` | `integer` | `102` | HTTP status code |

Any undefined attribute from the list above will be set to null.

Please refer to our [API Reference](/api-reference/?others) for a complete list of controllers-actions and their purposes.

Getters

| Name | Type | Description                      |
|------|------|----------------------------------|
| `response` | `RequestResponse` | Response view of the request, standardized as the expected [Kuzzle API response](/api-reference/?others#kuzzle-response) |


#### `response.getHeader`

Returns the value registered for the response header `name`

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `name` | `string` | Header name |

#### `response.getHeaders()`

Returns an object describing all currently registered headers on that response.

```
if (request.context.protocol === 'http') {
  request.response.setHeader('Content-Type', 'text/plain');

  /*
    Prints:
    { "Content-Type": "text/plain" }
   */
  console.log(request.response.getHeaders());
}
```

#### `response.removeHeader`

Removes header `name` from the response headers.

#### `setHeader`

Adds a header `name` with value `value` to the response headers.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `name` | `string` | Header name |
| `value` | `string` | Header value |

For standard headers, if `name` already exists, then the provided `value` will be concatenated
to the existing value, separated by a comma.  

As Kuzzle implements HTTP natively, this behavior changes for some HTTP specific headers,
to comply with the norm. For instance `set-cookie` values are amended in an array, and other headers like `user-agent` or `host` can store only 1 value.


#### `serialize`

Serializes the `Request` object into a pair of POJOs that can be sent across the network, and then used to rebuild another equivalent `Request` object.


```js
let foo = request.serialize();
let bar = new context.constructors.Request(request, foo.data, foo.options);
```

#### `setError`

Adds an error to the request, and sets the request's status to the error one.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `error` | `KuzzleError` or `Error` | Error object to set |

If a `KuzzleError` is provided, the request's status attribute is set to the error one.

Otherwise, the provided error is encapsulated into a [InternalError](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#errorsinternalerror) object, and the request's status is set to 500.

#### `setResult`

Sets the request's result.

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
| `raw` | `boolean` | Asks Kuzzle to send the provided result directly,instead of encapsulating it in a Kuzzle JSON response | `false` |

## Errors

### `KuzzleError`

Inherits from `Error`. Abstract class inherited by Kuzzle error objects.

This class should only be used to create new Kuzzle error objects.


### `BadRequestError`

**Status Code:** `400`

Used to notify about badly formed requests.

```js
var err = new context.errors.BadRequestError('error message');
```

### `ForbiddenError`

**Status Code:** `403`

Used when a user tries to use resources beyond his access rights.

```js
var err = new context.errors.ForbiddenError('error message');
```

### `GatewayTimeoutError`

**Status Code:** `504`

Used when a plugin takes too long to perform a task.

```js
var err = new context.errors.GatewayTimeoutError('error message');
```

### `InternalError`

**Status Code:** `500`

Standard generic error. Used for uncatched exceptions.

```js
var err = new context.errors.InternalError('error message');
```

### `NotFoundError`

**Status Code:** `404`

Used when asked resources cannot be found.

```js
var err = new context.errors.NotFoundError('error message');
```

### `ParseError`

**Status Code:** `400`

Used when a provided resource cannot be interpreted.

```js
var err = new context.errors.ParseError('error message');
```

### `PartialError`

**Status Code:** `206`

Used when a request only partially succeeded.

The constructor takes an additional `array` argument containing a list of failed parts.

```js
var err = new context.errors.PartialError('error message', [{this: 'failed'}, {andThis: 'failed too'}]);
```


### `PluginImplementationError`

**Status Code:** `500`

Used when a plugin fails.

```js
var err = new context.errors.PluginImplementationError('error message');
```

### `ServiceUnavailableError`

**Status Code:** `503`

Used when a resource cannot respond because it is temporarily unavailable.

```js
var err = new context.errors.ServiceUnavailableError('error message');
```

### `SizeLimitError`

**Status Code:** `413`

Used to notify about requests exceeding maximum limits.

```js
var err = new context.errors.SizeLimitError('error message');
```

### `UnauthorizedError`

**Status Code:** `401`

Used when a user fails a login attempt.

```js
var err = new context.errors.UnauthorizedError('error message');
```

## Log

These methods can be used to send messages to Kuzzle's log system.  
Different log level are provided, and lower priority levels may be ignored depending on how the Kuzzle server is configured.

The lower a log level is, the higher its priority.

### `debug`

Priority: 4

```js
context.log.debug('message');
```

### `error`

Priority: 0 (highest priority)

```js
context.log.error('error message');
```

### `info`

Priority: 2

```js
context.log.info('message');
```

### `silly`

Priority: 5 (lowest priority)

```js
context.log.silly('message');
```

### `verbose`

Priority: 3

```js
context.log.verbose('message');
```

### `warn`

Priority: 1

```js
context.log.warn('message');
```
