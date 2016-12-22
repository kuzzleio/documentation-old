## Architecture

![archi_fonctionnal](./images/global-overview.png)

Kuzzle Kernel API can be accessed from 3 different paths:

1. a [HTTP API](/api-reference/?http)
2. a [Websocket connexion](/api-reference/?websocket), using Kuzzle [Javascript SDK](/sdk-documentation)
3. or any other custom protocol, using a Protocol Plugin (example: [MQTT](/api-reference/?mqtt))

In the background, Kuzzle uses:

* a noSQL engine to store, index and search contents (we use Elasticsearch by default).
* a cache engine to store subscription lists (we use redis by default).

### Core architecture

Focus on the above "Kuzzle kernel":

![archi_core](./images/core-architecture.png)

#### Main core components

* **Proxy and entry points**: proxifies the communication beetween the client and Kuzzle (see [Connecting to kuzzle](/api-reference/#connecting-to-kuzzle)), and forward the input message to the Router.
* **Router**: implements the API routers, normalizes the input message and sends them to the Funnel
* **Funnel**: analyses the input message and calls the appropriate controller
* **Controllers**: handles the input message (see [API reference](/api-reference))
* **Internal Components**: Any component used internally by controllers
* **Service Components**: Any component used to interact with services (see [below](#gt-services))


### > Hooks

Hooks allow to attach actions to Kuzzle events.

For example, The **document** controller emits a `document:beforeCreate` event before a document is persisted in the storage engine.

See also [The list of available events](#kuzzle-events-list).

The event will trigger the execution of plugin functions attached to it.
Learn more in the [plugin documentation](#plugins).

##### Contributing

You can define and add your own custom hooks.

A hook must be a valid node.js module that implements an init() function.

The init function is passed to the current kuzzle instance object.

Your module must be placed in the /lib/hooks directory.

You can then attach your hook to some events by editing the [config/hooks.js](https://github.com/kuzzleio/kuzzle/blob/master/lib/config/hooks.js) configuration file.

### > Services


In Kuzzle, a Service module is the implementation of the interface to different components of the application (think of a *system* service).

Kuzzle currently implements the following Services:

* [elasticsearch.js](https://github.com/kuzzleio/kuzzle/blob/master/lib/services/elasticsearch.js): interface to [Elasticsearch](https://www.elastic.co/products/elasticsearch), used for persistent data storage.
* [redis.js](https://github.com/kuzzleio/kuzzle/blob/master/lib/services/redis.js): interface to the [redis](http://redis.io) cache server.
* [proxyBroker.js](https://github.com/kuzzleio/kuzzle/blob/master/lib/services/proxyBroker.js): interface with the proxy.
* [Broker Client and Server](https://github.com/kuzzleio/kuzzle/blob/master/lib/services/broker): implementation of the internal message broker.
* [internalEngine.js](https://github.com/kuzzleio/kuzzle/blob/master/lib/services/internalEngine.js): light interface with the internal index (containing kuzzle's configuration) in Elastic Search.


A Service can be added to different engines. For example, Redis is used by both the internalCache and the memoryStorage (see [default.config.js](https://github.com/kuzzleio/kuzzle/blob/master/default.config.js)).

