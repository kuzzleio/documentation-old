---
layout: full.html
algolia: true
title: accessors
order: 100
---

# accessors

## `execute`

Sends a request to [Kuzzle API]({{ site_base_path }}api-documentation).

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `request` | `Request` | A [`Request`]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) to execute  |
| `callback(error, request)` | `Function` | Function executed with the request's result |

**Note** 

When `callback` is invoked, the `request` argument is ALWAYS filled, even when there is an error.
This argument is the provided request, with its `result` and/or `error` parts filled.
To obtain the standardized Kuzzle response from it, simply use the getter `request.response`.

**Usage**

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

This accessor allows plugins to manage their private and secure permanent storage.  
Data stored in this space cannot be accessed from Kuzzle, its API, or from another plugin.

The only way a document stored in this space can be accessed is if the owner plugin explicitly allows it, by extending Kuzzle's API with a route exposing that data.

This storage space is a whole [data index]({{ site_base_path }}guide/essentials/persisted/#working-with-persistent-data).  

Data stored in this space can be accessed by using the [Repository constructor]({{ site_base_path }}plugins-reference/plugins-context/constructors/#repository)

### `bootstrap`

Allows to initialize the plugin storage index. When called, it will create the Elastisearch index
and the `collections` provided in argument. 

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

Allows to create a collection with its mapping. Can be called multiple times as long as the mapping is not modified. Consider using [`storage.bootstrap`]({{ site_base_path }}plugins-reference/plugins-context/accessors/#storage-bootstrap) if your collections are not dynamic.

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

This accessor allows to dynamically add or remove [authentication strategies]({{ site_base_path }}guide/essentials/user-authentication/#authentication-strategy)

<aside class="warning">
When dynamically adding or removing an authentication strategy, plugins are responsible of ensuring that all Kuzzle nodes across a cluster also adds or removes that strategy.<br/>
<br/>
Plugins should also make sure that, when changing the list of available strategies dynamically, that list will remain the same after a Kuzzle node restarts.
</aside>

### `add`

Adds a new authentication strategy. Users can be authenticated using that new strategy as soon as this method resolves.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `name` | `String` | The name of the new authentication strategy |
| `properties` | `Object` | Strategy properties. The description format is the same than the one used when [exposing a `strategies` object during an auth plugin initialization]({{ site_base_path}}plugins-reference/plugins-features/adding-authentication-strategy/#expose-authentication-strategies) |

**Returns**

This method returns a promise, that resolves to nothing when the authentication strategy has been successfully added.

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

Dynamically removes a strategy, preventing new authentications using it.  

<aside class="warning">
Authentication tokens created using that strategy ARE NOT invalidated by using this method. 
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

Triggers a custom event, listenable by [`hooks`]({{ site_base_path }}/plugins-reference/plugins-features/adding-hooks/). This allows other plugins to react to events generated by the current plugin. 

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `eventName` | `String` | The custom event name |
| `payload` | `Object` | An optional payload to attach to the triggered event |

**Note** 

The name of the resulting event being triggered will be generated as `"plugin-" + pluginName + ":" + eventName` in order to avoid collisions with Kuzzle native events.

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

Adds a new data type, that can be used to validate if a document is well-formed.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`validationType`|`object`| An object instance of a validation type |

**Returns**

Nothing. Can throw a `PluginImplementationError` if the validation type has not the expected form.

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

Validates a document wrapped in a `Request` object.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`request`|`Request`| A document wrapped as a `Request` object |
|`verbose`|`boolean`| Defines the behavior of the validation |

**Returns**

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
