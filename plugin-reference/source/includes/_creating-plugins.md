# Plugin types

To plug itself to Kuzzle, a plugin exposes properties, telling Kuzzle what the plugin does, and how and when it should be invoked.

Depending on the properties it exposes, a plugin can be of one or several of the following types detailed below.

## Listener plugins

`listener` plugins simply listen to events, and are supplied with these events data. These plugins cannot change the provided data, and Kuzzle does not wait for them to process the data either.

To configure a plugin as a `listener` on Kuzzle events, it needs to expose a `hooks` JSON object, linking Kuzzle events name with the names of plugin functions to execute.  
Each function that Kuzzle needs to call must also be exposed.

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
  this.init = function (config, context) {
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

## Worker plugins

A `worker` plugin is simply a `listener` plugin running in separate processes. This is especially useful when you have to perform cost-heavy operations without impeding Kuzzle performances.

To convert a `listener` plugin to a `worker` one, you only need to add the following attribute to the [plugin configuration](#gt-plugin-default-configuration): `threads: <number of threads>`

If this number of threads is greater than 0, Kuzzle will launch the plugin on as many separate threads.  
If there are more than 1 thread for that plugin, each time a listened event is fired, Kuzzle will pick one thread to notify using round-robin.

<aside class="notice">
As worker plugins are isolated in separated processes, the <a href="#the-plugin-context">plugin context</a> provided to worker plugins do not contain <code>accessors</code>
</aside>

Plugin configuration example:

```json
{
  "version": "2.0.1",
  "defaultConfig": {
    "threads": 2
  },
  "activated": true
}
```


## Pipe plugins

`pipe` plugins, like `listener` plugins, are attached to Kuzzle events, and they are supplied with these events data.  
But unlike `listener` plugins, Kuzzle waits for their results before continuing the process.

This means that `pipe` plugins may:

* modify the provided data on the fly
* instruct Kuzzle to abort the request, sending an immediate and custom answer to the requesting client

Where a listener exposes a `hooks` property, a pipe plugin needs to expose its events in a `pipes` one, listing the listened events, and the plugin functions to invoke whenever these events are fired (see the example below).

Since `pipe` plugins are a part of how Kuzzle processes client requests, Kuzzle enforces a timeout on them, rejecting the request altogether if a `pipe` plugin fails to respond in a timely fashion, and forwarding an appropriate [GatewayTimeoutError](#gt-error-gatewaytimeouterror) error to the original client.  
The timeout value can be configured in Kuzzle configuration file.

A single event can be listened by multiple `pipe` plugins. When this is the case, Kuzzle calls the attached plugins sequentially, without any particular order.

`pipe` plugins functions take a callback as their last parameter, and this callback **must** be called at the end of the processing with the following arguments: `callback(error, object)`, where:

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
  this.init = function (config, context) {
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

## Controller plugins

Kuzzle API is divided into "controllers", each one of them exposing "actions" to execute (see [API reference](http://kuzzle.io/api-reference/#common-attributes)).

`controller` plugins extend Kuzzle API by adding new controllers to it, each with their own list of available actions.


### How is the API extended

To avoid name conflicts, added controllers are prefixed with the plugin name.

Examples:

- HTTP: `GET http://<server>:<port>/_plugin/<plugin name>/<url defined by the plugin>/<resources>`

- Other protocols:

```javascript
{
  controller: '<plugin name>/<added controller name>',
  action: '<action of the added controller>',
  ...
}
```

### How to implement a `controller` plugin

A controller plugin must expose to Kuzzle the following objects:

- A `controllers` object, describing the new controller to add. It will automatically be made available to any network protocol, except for HTTP

- A `routes` objects, describing how the new controller should be exposed to the HTTP protocol. Only GET and POST verbs are accepted.

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
      myAction: 'actionImplementation',
      myOtherAction: 'otherActionImplementation'
    }
  };

  /*
    We also want to expose our new controller to the HTTP protocol.
    To do so, we give Kuzzle instructions on how we want to expose our
    controller to HTTP.
    Any parameter starting with a ':' in the URL will be made dynamic by Kuzzle.

    The first route exposes the following GET URL:
      http://<kuzzle server>:<port>/_plugin/<plugin name>/foo/<dynamic value>

    Kuzzle will provide the function 'actionImplementation' with a Request object,
    containing the "name" property: request.input.args.name = '<dynamic value>'

    The second route exposes the following POST URL:
      http://<kuzzle server>:<port>/_plugin/<plugin name>/bar

    Kuzzle will provide the content body of the request in the Request object
    passed to the function 'otherActionImplementation', in the request.input.body
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
  this.init = function (config, context) {
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
  this.actionImplementation = function (request) {
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
  this.otherActionImplementation = function (request) {
    // do action
    return Promise.resolve(/* result content */);

  };
}

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = MyController;
```

### How plugins receive action arguments

All action functions receive a [Request](#gt-constructor-request) object as main argument. Kuzzle will fill it with arguments provided by clients invoking the added controller:

* HTTP:
  * dynamic arguments provided in the URL, headers and query string arguments are stored in `request.input.args`
  * content body is made available in `request.input.body`
  * if the URL contains an `index`, a `collection` or a `_id` argument, it will be stored in `request.input.resource`

* Other protocols:
  * if the provided JSON object contains a `body` object, then its content will be stored in `request.input.body`
  * the following fields at the root of the provided JSON objects are available in `request.input.resource`: `index`, `collection`, `_id`
  * any unrecognized property at the root of the provided JSON object will be stored in the `request.input.args` part of the `Request` object


## Protocol plugins

Kuzzle core only supports HTTP communications natively. All other supported protocols are implemented as `protocol` plugins.  
By default, the Kuzzle official docker image is shipped with the following protocol plugins:

* [Socket.io](https://www.npmjs.com/package/kuzzle-plugin-socketio)
* [WebSocket](https://www.npmjs.com/package/kuzzle-plugin-websocket)

### How it works

Requests sent by clients can be forwarded to Kuzzle by protocol plugins using the [`router` accessor](#gt-accessor-router)  
To access these methods, simply call ``context.accessors.router.<router method>``:

| Router method | Arguments    | Returns | Description              |
|-----------------|--------------|---------|--------------------------|
| ``newConnection`` | ``protocol name`` (string) <br/>``connection ID`` (string) | A promise resolving to a ``RequestContext`` object | Declares a new connection to Kuzzle. |
| ``execute`` | ``request`` ([Request](#gt-constructor-request) object)<br/>``callback`` (a callback resolved with Kuzzle's response) |  | Executes a client request. |
| ``removeConnection`` | ``RequestContext`` (obtained with ``newConnection``) | | Asks Kuzzle to remove the corresponding connection and all its subscriptions |


Kuzzle expects `protocol` plugins to expose the following methods:

| Method | Arguments | Description                 |
|------|----------------|-----------------------------|
| ``init`` | `pluginConfiguration, context` | [Plugin initialization function](#gt-plugin-init-function) |
| ``joinChannel`` | `{channel, id}`| Tells protocol plugins that the connection `id` subscribed to the channel `channel` |
| ``leaveChannel`` | `{channel, id}` | Tells protocol plugins that the connection `id` left the channel `channel` |
| ``notify`` | `{channels, id, payload}` | Asks protocol plugins to emit a data `payload` (JSON Object) to the connection `id` (string), on the channels  `channels` (array of strings)|
| ``broadcast`` | `{channels, payload}` | Asks protocol plugins to emit a data `payload` (JSON Object) to clients connected to the channels list `channels` (array of strings) |
| ``disconnect`` | `id` | Asks protocol plugins to force-close the connection `id` |

The connection `id` Kuzzle sends to plugins is the one declared by `protocol` plugins using `context.accessors.router.newConnection`.

*For more information about channels, see our [API Documentation](http://kuzzle.io/api-reference/#on)*


### `protocol` plugin implementation example

```javascript
function MyPlugin () {
  this.pluginContext = null;

  // Example on how to maintain client contexts
  this.clients = {};

  /*
   Required plugin initialization function
   (see the "Plugin prerequisites" section)
  */
  this.init = function (config, context) {
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


## Authentication plugin

Kuzzle handles users security and authentication. The supported authentication strategies can be extended using `authentication` plugins.

Any strategy supported by [Passport](http://passportjs.org/) can be used to extend Kuzzle supported strategies, like we did with our official [OAUTH2 Authentication plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth).  

### Choose or implement a Passport strategy

[Passport](http://passportjs.org) supports a wide range of authentication strategies. If that is not enough, you can also implement your own strategy for your authentication plugin.

In any case, the chosen strategy must be available in the plugin local directory when Kuzzle installs it, either by adding the strategy in the plugin's NPM dependencies, or by including the strategy code directly in the plugin repository.

### Create a verification function

Since Kuzzle uses [Passport](http://passportjs.org) directly, using a strategy with Kuzzle is the same than using one with Passport.

First, you have to implement a [`verify` function](http://passportjs.org/docs/configure), which will be provided to a Passport strategy constructor. This function is then used by the Passport strategy to authorize or to deny access to a user.

The number of arguments taken by this `verify` function depends on the authentication strategy. For instance, a `local password` strategy needs the `verify` callback to be provided with an `user` name and his `password`.

All strategies require this `verify` callback to take a `done` callback as its last argument, supplying Passport with the authenticated user's information.

### Register the strategy to Kuzzle

Once you chose a strategy and implemented its corresponding `verify` callback function, all you have to do is to register it to Kuzzle, using the `passport` accessor available in the plugin context:

```js
pluginContext.accessors.passport.use(strategy);
```

### (optional) Scope of access

Some authentication procedures, like OAUTH 2.0, need a [scope of access](http://passportjs.org/docs/oauth) to be configured.

Kuzzle authentication plugins support scope of access. To add one in your plugin, simply expose a `scope` attribute. Its format depends on the provider the strategy implements.


### Authentication plugin example, using the LocalStrategy strategy

<aside class="notice">Passport strategy constructors take a "verify" callback. As the following example demonstrates, if the provided callback uses "this.[attribute]" attributes, then it's necessary to bind the provided callback to the plugin's context</aside>

```javascript
const LocalStrategy = require('passport-local').Strategy;

function MyAuthenticationPlugin () {
  this.context = null;

  /*
    Required plugin initialization function
    (see the "Plugin prerequisites" section)
   */
  this.init = function (pluginConfiguration, pluginContext) {
    this.context = pluginContext;

    this.context.accessors.passport.use(new LocalStrategy(this.verify.bind(this)));
  }

  this.verify = function (username, password, done) {
    // Code performing the necessary verifications
    if (success) {
      done(null, this.context.accessors.users.load(username));
    }
    else {
      done(new this.context.errors.ForbiddenError('Login failed'));
    }
  };
};

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = MyAuthenticationPlugin;
```
