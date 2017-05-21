---
layout: full.html
algolia: true
title: Kuzzle in depth
description: understand how to extend kuzzle
order: 400
show-subheader: true
subheader-title: Architecture
---

# Architecture

In this section we'll take a deeper look at the Kuzzle Core internals.

![archi_core]({{ site_base_path }}assets/images/core-architecture.png)

## Components

The above schema shows the main architecture in Kuzzle, which is composed of the following entities.

* **Kuzzle Proxy**: handles the communication between the client and Kuzzle (see [Connecting to kuzzle]({{ site_base_path }}api-documentation/connecting-to-kuzzle/)), and forwards the input message to the Router.
* **Router**: exposes the API routes, normalizes the Request and sends them to the Funnel.
* **Funnel**: analyses the Request and forwards it to the appropriate Controller.
* **Controllers**: handle and respond to client requests (see [API reference]({{ site_base_path }}api-documentation))
* **Internal Components**: Any component internally accessed by controllers.
* **Service Components**: Any component used to interact with external services (see [below]({{ site_base_path }}guide/kuzzle-depth/#services)).

## Services

In Kuzzle, a Service module is the implementation of the interface to different components of the application (think of a *system* service).

Kuzzle currently implements the following Services:

* [elasticsearch.js](https://github.com/kuzzleio/kuzzle/blob/master/lib/services/elasticsearch.js): interface to [Elasticsearch](https://www.elastic.co/products/elasticsearch), used for persistent data storage.
* [redis.js](https://github.com/kuzzleio/kuzzle/blob/master/lib/services/redis.js): interface to the [redis](http://redis.io) cache server.
* [proxyBroker.js](https://github.com/kuzzleio/kuzzle/blob/master/lib/services/proxyBroker.js): interface with the proxy.
* [Broker Client and Server](https://github.com/kuzzleio/kuzzle/blob/master/lib/services/broker): implementation of the internal message broker.
* [internalEngine.js](https://github.com/kuzzleio/kuzzle/blob/master/lib/services/internalEngine/): light interface with the internal index (containing kuzzle's configuration) in Elastic Search.


A Service can be added to different engines. For example, Redis is used by both the internalCache and the memoryStorage (see [default.config.js](https://github.com/kuzzleio/kuzzle/blob/master/default.config.js)).
