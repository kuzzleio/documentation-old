# Plugin Features

Depending on the properties it exposes, a plugin can extend of one or several of the following features of Kuzzle:

* Core
  - Listening asynchronously to events (on the same thread or a separate one),
  - Listening synchronously to events (and intercept the Request life-cycle),
  - Adding a controller route,
  - Adding a new authentication strategy.
* Proxy
  - Adding a new communication protocol.

## Listening asynchronously (adding a hook)

Plugins enable you to add asynchronous listener functions to a set of [events](#kuzzle-events-list). We'll call these asynchronous listener functions **hooks** from now on.

Hooks are supplied with these events data. They cannot change the provided data, and Kuzzle does not wait for them to process the data either.

Hooks are declared in the `hooks` property of the Plugin class, where the keys of the object are event names and the values are the names of the corresponding listeners.
Each hook must also be exported.

**Example**

```javascript
function MyPlugin () {
  /*
    This exposed "hooks" property tells Kuzzle that it needs to
    attach the plugin function "myFunction" to the Kuzzle event
    "eventType:hookName"

    The function "myFunction" will be called whenever the event
    "eventType:hookName" is fired.
   */
  this.hooks = {
    'eventType:hookName': 'myFunction'
  };

  /*
   Required plugin initialization function
   (see the "Plugin prerequisites" section)
   */
  this.init = function (customConfig, context) {
    // initializes the plugin
  };

  /*
   The configured function to call whenever the
   "eventType:hookName" event is fired
   */
  this.myFunction = function (message, event) {
    console.log(`Event ${event} triggered`);
    console.log(`Message received: ${message}`);
  };
}

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = MyPlugin;
```

### Executing hooks in separate threads

Plugins declaring hooks can also be executed in separate threads. This is handy when they perform heavy computations that may corrupt the performances of the Kuzzle Core.

To achieve this, Kuzzle must specify a `threads` property in the [custom configuration](../guide/#configuring-kuzzle) of the Plugin.

```json
{
  "plugins": {
    "kuzzle-plugin-blabla": {
      "threads": 1
    }
  }
}
```

If this number of threads is greater than 0, Kuzzle will launch the plugin on as many separate threads.  
If there are more than 1 thread for that plugin, each time a listened event is fired, Kuzzle will pick one thread to notify using round-robin.

<aside class="notice">
As the Plugin is isolated in separated processes, the <a href="#the-plugin-context">plugin context</a> provided to worker plugins do not contain <code>accessors</code>
</aside>

## Listening synchronously (adding a pipe)

Plugins enable you to add synchronous listener functions to a set of [events](#kuzzle-events-list). We'll call these synchronous listener functions **pipes** from now on.

Pipes are supplied with these events data, they are able to intercept the request, modify the data and interrupt its life-cycle.
Kuzzle waits for their results before continuing the process.

Pipes are a step in the process of handling client requests, thus Kuzzle enforces a timeout on them, rejecting the request altogether if a synchronous listener fails to respond in a timely fashion, and forwarding an appropriate [GatewayTimeoutError](#gt-error-gatewaytimeouterror) error to the client.  
The timeout value can be configured in [Kuzzle configuration file](../guide/#configuring-kuzzle).

Pipes are declared in the `pipes` property of the Plugin class, where the keys of the object are event names and the values are the names of the corresponding listeners.
Each pipes must also be exported.

A single event can be listened by multiple pipes. When this is the case, they behave like middleware functions (like a pipeline). Kuzzle calls them sequentially, without any particular order, piping the data from one function to the other.

Pipes take a callback as their last parameter, which **must** be called at the end of the processing with the following arguments: `callback(error, object)`, where:

* `error`: set this value to a `KuzzleError` object to make Kuzzle abort the request, and return that error to the client. Otherwise, set it to `null`
* `object`: the resulting data, given back to Kuzzle for processing

The following plugin example adds a `createdAt` attribute to all newly created documents:

```javascript
function MyPlugin () {
  /*
    This exposed "pipes" property tells Kuzzle that it needs to
    attach the plugin function "addCreatedAt" to the Kuzzle event
    "document:beforeCreate"

    The function "addCreatedAt" will be called whenever the event
    "document:beforeCreate" is fired. Kuzzle will wait for
    the function's result before continuing the request process
   */
  this.pipes = {
    'document:beforeCreate': 'addCreatedAt'
  };

  /*
    Required plugin initialization function
    (see the "Plugin prerequisites" section)
   */
  this.init = function (customConfig, context) {
    // Plugin initialization
  };

  // Called whenever "document:beforeCreate" is fired
  this.addCreatedAt = function (request, callback) {
    request.input.body.createdAt = Date.now();
    callback(null, request);
  };
}

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = MyPlugin;
```

## Adding a controller route

Kuzzle API is divided into "controllers", each one of them exposing "actions" to execute (see [API reference](../api-reference/#common-attributes)).

Plugins enable to add a set of new controllers to the Kuzzle public API, each with their own list of available actions.

### How is the API extended

To avoid name conflicts, added controllers are prefixed with the plugin name.

Examples:

- HTTP: `GET http://<server>:<port>/_plugin/<plugin name>/<url defined by the plugin>/<resources>`
- Other protocols:

```litcoffee
{
  "controller": "<plugin name>/<added controller name>",
  "action": "<action of the added controller>",
  ...
}
```

### Implementing a controller route

To create a new controller, the Plugin must expose to Kuzzle the following objects:

- A `controllers` object, describing the new controller(s) to add. It will automatically be made available to any network protocol, except for HTTP
- A `routes` objects, describing how the new controller(s) should be exposed to the HTTP protocol. Only GET and POST verbs are accepted.
- Controller's actions functions. These methods take a `Request` object as an argument, and must return a `Promise` resolving with the action's result, or rejecting with a KuzzleError object.

### Controller plugin implementation example

```javascript
function MyPlugin () {
  /*
    This exposed "controllers" property tells Kuzzle that it needs to extend
    its API with new controllers and actions.

    Here, we add a controller "newController", with 2 described actions:
    "myAction" and "myOtherAction".

    These actions point to functions exposed to Kuzzle by the plugin.

    Any network protocol other than HTTP will be able to invoke this new
    controller with the following JSON object:

    {
      controller: '<plugin name>/newController',
      action: 'myAction',
      ...
    }
   */
  this.controllers = {
    newController: {
      myAction: 'actionFunction',
      myOtherAction: 'otherActionFunction'
    }
  };

  /*
    We also want to expose our new controller to the HTTP protocol.
    To do so, we give Kuzzle instructions on how we want to expose our
    controller to HTTP.
    Any parameter starting with a ':' in the URL will be made dynamic by Kuzzle.

    The first route exposes the following GET URL:
      http://<kuzzle server>:<port>/_plugin/<plugin name>/foo/<dynamic value>

    Kuzzle will provide the function 'actionFunction' with a Request object,
    containing the "name" property: request.input.args.name = '<dynamic value>'

    The second route exposes the following POST URL:
      http://<kuzzle server>:<port>/_plugin/<plugin name>/bar

    Kuzzle will provide the content body of the request in the Request object
    passed to the function 'otherActionFunction', in the request.input.body
    property
   */
  this.routes = [
    {verb: 'get', url: '/foo/:name', controller: 'newController', action: 'myAction'},
    {verb: 'post', url: '/bar', controller: 'newController', action: 'myOtherAction'}
  ];

  /*
    Required plugin initialization function
    (see the "Plugin prerequisites" section)
   */
  this.init = function (customConfig, context) {
    // plugin initialization
  };

  /*
    Implements the action newController/myAction
    Takes a Request object as an argument, and MUST return
    a promise resolved (or rejected) with the action's result
    This result can be of any JS type (scalar, object, array), and
    will be used to build a response to send to the requesting client

    See the "How plugins receive action arguments" chapter just below
    for more information.
   */
  this.actionFunction = function (request) {
    // do action

    // optional: set network specific headers
    if (request.context.protocol === 'http') {
      // expires in 1h
      request.response.setHeader('expires', new Date(Date.now() + 3600000).toUTCString());
    }

    // Resolve with the result content. For instance:
    return Promise.resolve({acknowledge: true});
  };

  /*
    Implements the action newController/myOtherAction
    Takes a Request object as an argument, and MUST return
    a promise resolved (or rejected) with the action's result
    This result can be of any JS type (scalar, object, array), and
    will be used to build a response to send to the requesting client

    See the "How plugins receive action arguments" chapter just below
    for more information.
   */
  this.otherActionFunction = function (request) {
    // do action
    return Promise.resolve(/* result content */);

  };
}

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = MyController;
```

### How Plugins receive action arguments

All action functions receive a [Request](#gt-constructor-request) object as main argument. Kuzzle will fill it with arguments provided by clients invoking the added controller:

* HTTP:
  * dynamic arguments provided in the URL, headers and query string arguments are stored in `request.input.args`
  * content body is made available in `request.input.body`
  * if the URL contains an `index`, a `collection` or a `_id` argument, it will be stored in `request.input.resource`

* Other protocols:
  * if the provided JSON object contains a `body` object, then its content will be stored in `request.input.body`
  * the following fields at the root of the provided JSON objects are available in `request.input.resource`: `index`, `collection`, `_id`
  * any unrecognized property at the root of the provided JSON object will be stored in the `request.input.args` part of the `Request` object

## Adding a new authentication strategy

Kuzzle handles users security and authentication. The supported authentication strategies can be extended by Plugins.

Any strategy supported by [Passport](http://passportjs.org/) can be used to extend Kuzzle supported strategies, like we did with our official [OAUTH2 Authentication plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth).

### Choose or implement a Passport strategy

[Passport](http://passportjs.org) supports a wide range of authentication strategies. If that is not enough, you can also implement your own strategy for your authentication Plugin.

In any case, the chosen strategy must be available in the Plugin local directory when Kuzzle installs it, either by adding the strategy in the Plugin's NPM dependencies, or by including the strategy code directly in the Plugin repository.

### Expose a `strategies` attribute

The `strategies` object must contain one attribute per added strategy. This attribute must be named after the strategy name and be an object containing:

* config: The configuration part
  * constructor: The constructor of the Passport strategy
  * strategyOptions: The options provided to the Passport strategy constructor
  * authenticateOptions: The options provided to the Passport's (authenticate method)[http://passportjs.org/docs/authenticate].
  * fields: The list of fields that can be provided to the plugin.
* methods:
  * create: The name of the `create` function in the plugin object.
  * delete: The name of the `delete` function in the plugin object.
  * exists: The name of the `exists` function in the plugin object.
  * getInfo: The name of the `getInfo` function in the plugin object.
  * update: The name of the `update` function in the plugin object.
  * validate: The name of the `validate` function in the plugin object.
  * verify: The name of the `verify` function in the plugin object.


#### Example

Here is a skeleton of authentication plugin

```javascript
const StrategyConstructor = require('some-passport-strategy');

/**
 * @class AuthenticationPlugin
 */
class AuthenticationPlugin {
  /**
   * @constructor
   */
  constructor() {}

  /**
   * @param {object} customConfig
   * @param {KuzzlePluginContext} context
   * @returns {*}
   */
  init (customConfig, context) {
    this.strategies = {
      // The name of the strategy
      strategyName: {
        config: {
          // The constructor of the passport strategy you chose
          constructor: StrategyConstructor,
          // The options provided to the strategy constructor at instanciation
          strategyOptions: {},
          // The options provided to the authenticate function during the authentication process
          authenticateOptions: {
            scope: []
          },
          // The list of fields that may be provided in the credentials
          fields: ['login', 'password']
        },
        methods: {
          // The name of the create function
          create: 'create',
          // The name of the delete function
          delete: 'delete',
          // The name of the exists function
          exists: 'exists',
          // The name of the getInfo function
          getInfo: 'getInfo',
          // The name of the update function
          update: 'update',
          // The name of the validate function
          validate: 'validate',
          // The name of the verify function
          verify: 'verify'
        }
      }
    };
  }

  /**
   * Called after the strategy has been built with the constructor
   *
   * @param {*} constructedStrategy
   * @returns {Promise<object>}
   */
  afterRegister (constructedStrategy) {
    // do some action
    Promise.resolve(/* any value */);
  }

  /**
   * Persists the provided credentials in some way
   * Must keep a link between the persisted credentials
   * and the kuid
   *
   * @param {KuzzleRequest} request
   * @param {object} credentials
   * @param {string} kuid
   * @returns {Promise<object>}
   */
  create (request, credentials, kuid) {
    // persist credentials
    Promise.resolve(/* non sensitive credentials info */);
  }

  /**
   * Removes the user's stored credentials from
   * the plugin persistence layer
   *
   * @param {KuzzleRequest} request
   * @param {string} kuid
   * @returns {Promise<object>}
   */
  delete (request, kuid) {
    // remove credentials
    Promise.resolve(/* any value */);
  }

  /**
   * Checks if user's credentials exist in the persistence layer
   *
   * @param {KuzzleRequest} request
   * @param {string} kuid
   * @returns {Promise<boolean>}
   */
  exists (request, kuid) {
    // check credentials existence
    Promise.resolve(/* true|false */);
  }

  /**
   * Retrieves the non sensitive user's credentials information
   * from the persistence layer
   *
   * @param {KuzzleRequest} request
   * @param {string} kuid
   * @returns {Promise<object>}
   */
  getInfo (request, kuid) {
    // retrieve credentials
    Promise.resolve(/* non sensitive credentials info */);
  }

  /**
   * Retrieves the non sensitive user's credentials information
   * from the persistence layer using the strategy internal id
   *
   * @param {KuzzleRequest} request
   * @param {string} id
   * @returns {Promise<object>}
   */
  getById (request, id) {
    // retrieve credentials
    Promise.resolve(/* non sensitive credentials info */);
  }

  /**
   * Updates the user's credentials information in the
   * persistence layer
   *
   * @param {KuzzleRequest} request
   * @param {object} credentials
   * @param {string} kuid
   * @returns {Promise<object>}
   */
  update (request, credentials, kuid) {
    // update credentials
    Promise.resolve(/* non sensitive credentials info */);
  }

  /**
   * Validates credentials validity conforming to the
   * authentication strategy rules (mandatory fields,
   * password length, username uniqueness, ...)
   *
   * @param {KuzzleRequest} request
   * @param {object} credentials
   * @param {string} kuid
   * @param {boolean} isUpdate
   * @returns {Promise<boolean>}
   */
  validate (request, credentials, kuid, isUpdate) {
    // validate credentials
    Promise.resolve(/* true|false */);
  }

  /**
   * Provided to the Passport strategy as verify function
   * Should return the kuid if the user can authentify
   * or an object with the login failure reason as message attribute
   * 
   * @param {KuzzleRequest} request
   * @param {*[]} args - provided arguments depends on the Passport strategy
   * @returns {Promise<string|{message: string}>}
   */
  verify (request, ...args) {
    // verify if the user can authentify
    const kuid = getUserIdFromCredentials(args);
    
    if (kuid) {
      return Promise.resolve(kuid);
    }
    
    return Promise.resolve({message: 'Login failed - Reason ...'});
  }
}
```


### The verify function

You have to implement a [`verify` function](http://passportjs.org/docs/configure) (its name depends on the configuration provided in the `strategies` attribute), which will be used by Kuzzle to authorize or to deny access to a user.

The number of arguments taken by this `verify` function depends on the authentication strategy. For instance, a `local password` strategy needs the `verify` callback to be provided with an `username` and his `password`.

Here is the generic signature of the `verify` function you have to implement:

`verify(request, ...)`

* `request` is the login request made to passport. The object format is `{query: {passport: 'crendentials'}, original: Request}` (see [the `Request` documentation](#request))
* `...`: varies, depending on the used strategy

The function **must** return a `Promise` that resolves to either the user [`<kuid>`](../guide/#the-kuzzle-user-identifier) if the user is authenticated, or an object containing a message string attribute giving the reason why it can not be authenticated. The function should reject the Promise if an error occurs (note: an authentication rejection is *not* an error).


### The exists function

You have to implement an `exists` function (its name depends on the configuration provided in the `strategies` attribute), which will be used by Kuzzle to verify if a user can be authenticated using your strategy.

Here is the generic signature of the `exists` function you have to implement:

`exists (request, kuid)`

* `request` is the request made to Kuzzle (see [the `Request` documentation](#request)).
* `kuid` is the user [`<kuid>`](../guide/#the-kuzzle-user-identifier).

The function **must** return a `Promise` that resolves to a boolean depending on the user ability to authenticate with a strategy.

### The create function

You have to implement an `create` function (its name depends on the configuration provided in the `strategies` attribute), used by Kuzzle to add credentials to a user using this strategy.

Here is the generic signature of the `create` function you have to implement:

`create (request, credentials, kuid)`

* `request` is the request made to Kuzzle (see [the `Request` documentation](#request)).
* `credentials` is the content of the credentials to create, that have already been passed to your `validate` function.
* `kuid` is the user [`<kuid>`](../guide/#the-kuzzle-user-identifier).

The function **must** return a `Promise` that resolves to an object that contains **non sensitive** information of the object (can be an empty object).

<aside class="warning">
  The credentials have to be persisted, either by using the <a href="#repository">Repository constructor</a>, or any external service.
</aside>


### The update function

You have to implement an `update` function (its name depends on the configuration provided in the `strategies` attribute), used by Kuzzle to update a user's credentials to this strategy.

Here is the generic signature of the `update` function you have to implement:

`update (request, credentials, kuid)`

* `request` is the request made to Kuzzle (see [the `Request` documentation](#request)).
* `credentials` is the content of the credentials to create, that have already been passed to your `validate` function.
* `kuid` is the user [`<kuid>`](../guide/#the-kuzzle-user-identifier).

The function **must** return a `Promise` that resolves to an object that contains **non sensitive** information of the object (can be an empty object).

<aside class="warning">
  The credentials have to be persisted, either by using the <a href="#repository">Repository constructor</a>, or any external service.
</aside>


### The delete function

You have to implement a `delete` function (its name depends on the configuration provided in the `strategies` attribute), used by Kuzzle to delete a user's credentials to this strategy.

Here is the generic signature of the `delete` function you have to implement:

`delete (request, kuid)`

* `request` is the request made to Kuzzle (see [the `Request` documentation](#request)).
* `kuid` is the user [`<kuid>`](../guide/#the-kuzzle-user-identifier).

The function **must** return a `Promise` that resolves to any value if deletion succeeds.


### The getInfo function

You may implement a `getInfo` function (its name depends on the configuration provided in the `strategies` attribute), used by Kuzzle to get informations about a user's credentials to this strategy. For security reasons, only **non sensitive** informations should be returned.

Here is the generic signature of the `getInfo` function you have to implement:

`getInfo (request, kuid)`

* `request` is the request made to Kuzzle (see [the `Request` documentation](#request)).
* `kuid` is the user [`<kuid>`](../guide/#the-kuzzle-user-identifier).

The function **must** return a `Promise` that resolves to an object that contains **non sensitive** information of the object (can be an empty object).

<aside class="info">
  If no getInfo function is provided, an empty object will be returned by controllers that use it.
</aside>

### The getById function

You may implement a `getById` function (its name depends on the configuration provided in the `strategies` attribute), used by Kuzzle to get informations about a user's credentials to this strategy searching by the strategy storage identifier (`_id`). For security reasons, only **non sensitive** informations should be returned.

Here is the generic signature of the `getInfo` function you have to implement:

`getInfo (request, id)`

* `request` is the request made to Kuzzle (see [the `Request` documentation](#request)).
* `id` is the user's storage identifier in the strategy.

The function **must** return a `Promise` that resolves to an object that contains **non sensitive** information of the object (can be an empty object).

<aside class="info">
  If no getById function is provided, an empty object will be returned by controllers that use it.
</aside>


### The afterRegister function

You may implement a `afterRegister` function (its name depends on the configuration provided in the `strategies` attribute), which will be called once the strategy constructor has been build

Here is the generic signature of the `afterRegister` function you have to implement:

`afterRegister (constructedStrategy)`

* `constructedStrategy` is the instance of the Passport strategy constructor.

The function **may** return any value as it will be ignored.

<aside class="info">
  If no afterRegister function is provided, Kuzzle won't try to call it, and register will process as expected.
</aside>


### The validate function

You have to implement a `validate` (its name depends on the configuration provided in the `strategies` attribute), which will be used by Kuzzle to check if the provided user's credentials to this strategy are well-formed.

Here is the generic signature of the `validate` function you have to implement:

`validate (request, credentials, kuid, isUpdate)`

* `request` is the request made to Kuzzle (see [the `Request` documentation](#request)).
* `credentials` is the content of the credentials to create or update.
* `kuid` is the user [`<kuid>`](../guide/#the-kuzzle-user-identifier).
* `isUpdate` is true if `validate` is called during an update.

The function **must** return a `Promise` that resolves to true or rejects with an error explaining the reason.

<aside class="warning">
  Validate can be called during an update with partial information. The validation should behave accordingly when isUpdate is true, knowing that mandatory information should already have been stored during a previous create call.
</aside>

## Adding a new communication protocol

Kuzzle core only supports HTTP communications natively. All other supported protocols are implemented by Plugins installed on the Kuzzle Proxy.
By default, the Kuzzle Proxy official docker image is shipped with the following protocol plugins:

* [Socket.io](https://www.npmjs.com/package/kuzzle-plugin-socketio)
* [WebSocket](https://www.npmjs.com/package/kuzzle-plugin-websocket)

### How it works

Requests sent by clients can be forwarded to Kuzzle using the [`router` accessor](#gt-accessor-router)  
To access these methods, simply call `context.accessors.router.<router method>`:

| Router method | Arguments    | Returns | Description              |
|-----------------|--------------|---------|--------------------------|
| `newConnection` | `protocol name` (string) <br/>`connection ID` (string) | A promise resolving to a `RequestContext` object | Declares a new connection to Kuzzle. |
| `execute` | `request` ([Request](#gt-constructor-request) object)<br/>`callback` (a callback resolved with Kuzzle's response) |  | Executes a client request. |
| `removeConnection` | `RequestContext` (obtained with `newConnection`) | | Asks Kuzzle to remove the corresponding connection and all its subscriptions |

Kuzzle Proxy expects Protocol Plugins to expose the following methods:

| Method | Arguments | Description                 |
|------|----------------|-----------------------------|
| `init` | `pluginConfiguration, context` | [Plugin initialization function](#gt-plugin-init-function) |
| `joinChannel` | `{channel, id}`| Tells Protocol Plugins that the connection `id` subscribed to the channel `channel` |
| `leaveChannel` | `{channel, id}` | Tells Protocol Plugins that the connection `id` left the channel `channel` |
| `notify` | `{channels, id, payload}` | Asks Protocol Plugins to emit a data `payload` (JSON Object) to the connection `id` (string), on the channels  `channels` (array of strings)|
| `broadcast` | `{channels, payload}` | Asks Protocol Plugins to emit a data `payload` (JSON Object) to clients connected to the channels list `channels` (array of strings) |
| `disconnect` | `id` | Asks protocol plugins to force-close the connection `id` |

The connection `id` Kuzzle sends to Plugins is the one declared by Protocol Plugins using `context.accessors.router.newConnection`.

*For more information about channels, see our [API Documentation](../api-reference/#subscribe)*

### Implementation example

```javascript
function MyPlugin () {
  this.pluginContext = null;

  // Example on how to maintain client contexts
  this.clients = {};

  /*
   Required plugin initialization function
   (see the "Plugin prerequisites" section)
  */
  this.init = function (customConfig, context) {
    // plugin initialization
    this.pluginContext = context;
  };

  /*
   This function is only an example showing how to interact with
   clients and with Kuzzle. It does not implement any actual protocol.

   The way a protocol plugins handles clients closely depends on the
   implemented protocol.
   */
  this.handleClient = function () {
    // when a client connects
    this.on('onClientConnect', function (connectionId) {
      this.pluginContext.accessors.router.newConnection("protocol name", connectionId)
        .then(context => {
          this.clients[connectionId] = context;
        });
    });

    // when a client sends a request
    this.on('onClientRequest', function (connectionId, data) {
      // Instantiates a Request object to be passed to Kuzzle
      let request = new Request(data, this.clients[connectionId]);

      this.pluginContext.accessors.router.execute(request, response => {
        // forward the response to the client
      });
    });

    // whenever a client is disconnected
    this.on('onClientDisconnect', function (connectionId) {
      this.pluginContext.accessors.router.removeConnection(this.clients[connectionId]);
      delete this.clients[connectionId];
    });
  };

  /*
   Invoked by Kuzzle when a "data.payload" payload needs to be
   broadcasted to the "data.channels" channels

   The payload is a Kuzzle response as a plain-old JSON object
  */
  this.broadcast = function (data) {
    data.channels.forEach(channel => {
      // sends data.payload to the channel
    });
  };

  /*
   Invoked by Kuzzle when a "data.payload" payload needs to be
   notified to the connection "data.id", on the "data.channels" channels

   The payload is a Kuzzle response as a plain-old JSON object
  */
  this.notify = function (data) {
    data.channels.forEach(channel => {
      // sends "data.payload" to the connection "data.id" and to
      // the channel "channel"
    });
  };

  /*
    Invoked by Kuzzle when the connection "data.id" joins the
    channel "data.channel"
   */
  this.joinChannel = function (data) {
     // ...
  };

  /*
    Invoked by Kuzzle when the connection "data.id" leaves the
    channel "data.channel"
   */
  this.leaveChannel = function (data) {
    // ...
  };

  /*
    Invoked by Kuzzle when it needs to force-close a client connection
   */
  this.disconnect = function (id) {
    // close the connection opened by the connection "id"
  };
};

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = MyPlugin;
```
