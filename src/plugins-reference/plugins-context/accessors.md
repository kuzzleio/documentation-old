---
layout: full.html
algolia: true
title: accessors
order: 100
---

# accessors

## `execute`

{{{since "1.0.0"}}}

Sends a request to [Kuzzle Backend API]({{ site_base_path }}api-documentation).


#### With promises

**`execute(request, [overloadProtection])`**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `request` | `Request` | A [`Request`]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) to execute  |
| `overloadProtection` | `Boolean` | Optional. Default: `true`. See [Overload Protection]({{ site_base_path }}plugins-reference/plugins-context/accessors/#overload-protection) |

Returns a Promise, that resolves to the source `Request` object with the response part set (see [Request attributes]({{ site_base_path }}plugins-reference/plugins-context/constructors/#attributes)), or rejects with a [KuzzleError]({{ site_base_path }}plugins-reference/plugins-context/errors/).


#### With callbacks

**`execute(request, [overloadProtection], callback)`**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `request` | `Request` | A [`Request`]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) to execute  |
| `overloadProtection` | `Boolean` | Optional. Default: `true`. See [Overload Protection]({{ site_base_path }}plugins-reference/plugins-context/accessors/#overload-protection) |
| `callback(error, request)` | `Function` | Function executed with the request's result |

Upon completion, the `request` argument provided to the callback function will be the source request with its response part filled (see [Request attributes]({{ site_base_path }}plugins-reference/plugins-context/constructors/#attributes)).

#### Overload Protection

Kuzzle Backend has a configurable overload-protection mechanism. When a request is made to the Kuzzle Backend API, there are three possible outcomes:

* Kuzzle Backend has room for that request and it is executed immediately
* Other requests are already running and taking up resources, the new request is delayed until resources are freed
* Kuzzle Backend is overloaded: requests are rejected until the request buffer is no longer at capacity

In general, requests should be processed with the overload-protection enabled. However, in some cases you may want to ensure that a request is executed with a predictable and constant delay. For such cases, the overload protection mechanism can be disabled.

We recommend that you only disable the overload protection when it is truly necessary and only for small sets of requests.  
If plugins have to handle rejected requests because Kuzzle Backend is overloaded, then disabling this protection to prevent these errors will only hide the problem instead of solving it. Instead, we encourage administrators to either adjust the size of the request buffer in [Kuzzle Backend's configuration]({{ site_base_path }}guide/essentials/configuration/), or to add more Kuzzle Backend nodes to their infrastructure.

#### Example

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

## `storage`

This accessor allows plugins to manage their own private and secure permanent storage.  
Data stored in this space cannot be accessed from Kuzzle Backend, or from the Kuzzle Backend API, or from another plugin.

The only way a document stored in this space can be accessed outside the plugin is if that plugin extends Kuzzle Backend's API with a route exposing that data.

This storage space is a whole [data index]({{ site_base_path }}guide/essentials/persisted/#working-with-persistent-data).  

Data stored in this space can be accessed through the [Repository constructor]({{ site_base_path }}plugins-reference/plugins-context/constructors/#repository).

### `bootstrap`

{{{since "1.0.0"}}}

Used to initialize the plugin storage index. When called, it will create the Elastisearch index
and the `collections` provided in the input argument. 

Can be called multiple times as long as the mappings are not modified through calls.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`collections`|`Object`| An object that contains the collection mappings. See the [guide]({{ site_base_path }}guide/essentials/persisted/#document-mapping) for more explanation about Elasticsearch mapping. |

**Returns**

Returns a `promise` that resolves to a `boolean` that indicates if the index and the collections already existed or not.

**Usage**

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

### `createCollection`

{{{since "1.0.0"}}}

Used to create a collection with its mapping. Can be called multiple times as long as the mapping is not modified. Consider using [`storage.bootstrap`]({{ site_base_path }}plugins-reference/plugins-context/accessors/#storage-bootstrap) if your collections are not dynamic.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`collection`|`string`| The collection name |
|`collectionMapping`|`object`| The collection mapping |

**Returns**

Returns a `promise` that resolves to the object `{ acknowledged: true }`.

**Usage**

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

## `strategies`

This accessor can be used to dynamically add or remove [authentication strategies]({{ site_base_path }}guide/essentials/user-authentication/#authentication-strategy)

In a cluster context, Kuzzle Backend will add/remove strategies on all nodes.

<aside class="warning">
Plugins should also make sure that, when changing the list of available strategies dynamically, that list will remain the same after a Kuzzle Backend node restarts.
</aside>

### `add`

{{{since "1.2.0"}}}

Adds a new authentication strategy. Users can be authenticated using that new strategy as soon as this method resolves.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `name` | `String` | The name of the new authentication strategy |
| `properties` | `Object` | Strategy properties. The description format is the same than the one used when [exposing a `strategies` object during an auth plugin initialization]({{ site_base_path}}plugins-reference/plugins-features/adding-authentication-strategy/#expose-authentication-strategies) |

**Returns**

This method returns a promise that resolves to nothing when the authentication strategy has been successfully added.

The promise will be rejected when:

* the properties for that strategy are invalid or incomplete
* a strategy of the same name already exists

**Usage**

```js
context.accessors.strategies.add('someStrategy', {
  config: {
    constructor: StrategyConstructor,
    strategyOptions: {},
    authenticateOptions: {
      scope: []
    },
    fields: ['field1', 'field2', '...', 'fieldn']
  },
  methods: {
    afterRegister: 'afterRegister',
    create: 'create',
    delete: 'delete',
    exists: 'exists',
    getById: 'getById',
    getInfo: 'getInfo',
    update: 'update',
    validate: 'validate',
    verify: 'verify'
  }
});
```

### `remove`

{{{since "1.2.0"}}}

Dynamically removes a strategy, preventing new authentications from using it.  

<aside class="warning">
Authentication tokens previously created using that strategy ARE NOT invalidated after using this method. 
</aside>

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `name` | `String` | The name of the authentication strategy to remove |


**Returns**

A promise, resolving to nothing if the strategy has been successfully removed.

This promise will be rejected when:

* the strategy to remove does not exist
* the strategy to remove is owned by another plugin

**Usage**

```js
context.accessors.strategies.remove('someStrategy');
```

---

## `trigger`

{{{since "1.0.0"}}}

Triggers a custom event, listened to by [`hooks`]({{ site_base_path }}/plugins-reference/plugins-features/adding-hooks/). This allows other plugins to react to events generated by the current plugin. 

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `eventName` | `String` | The custom event name |
| `payload` | `Object` | An optional payload to attach to the triggered event |

**Note** 

The name of the resulting event being triggered will have the format `"plugin-" + pluginName + ":" + eventName` in order to avoid any conflicts with Kuzzle Backend native events.

**Usage**

```js
// Emitting plugin, called "some-plugin"
context.accessors.trigger('someEvent', {
  someAttribute: 'someValue'
});

// Listening plugin
class ListeningPlugin {
  constructor () {
    this.hooks = {
      // Notice the generated event name
      'plugin-some-plugin:someEvent': 'someEventListener'
    };
  }

  someEventListener (payload) {
    this.doSomething(payload);
  }
}
```

---

## `validation`

This accessor exposes basic functionalities of the [Data Validation API]({{ site_base_path }}validation-reference/)

### `addType`

{{{since "1.0.0"}}}

Adds a new data type, that can be used to validate a document.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`validationType`|`object`| An object instance of a validation type |

**Returns**

Nothing. Can throw a `PluginImplementationError` if the validation type does not have the expected form.

**Usage**

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

### `validate`

{{{since "1.0.0"}}}

Validates a document wrapped in a `Request` object.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`request`|`Request`| A document wrapped as a `Request` object |
|`verbose`|`boolean`| Defines the behavior of the validation |

**Returns**

If `verbose` is set to `false`:

Returns a `promise` that resolves to a modified `Request` instance where `defaultValues` are applied. Rejects if the validation fails.

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
