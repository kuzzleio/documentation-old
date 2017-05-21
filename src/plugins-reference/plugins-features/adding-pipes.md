---
layout: full.html
algolia: true
title: Listening synchronously
order: 200
---

# Listening synchronously

Plugins enable you to add synchronous listener functions to a set of [events]({{ site_base_path }}plugins-reference/kuzzle-events-list). We'll call these synchronous listener functions **pipes** from now on.

Pipes are supplied with these events data, they are able to intercept the request, modify the data and interrupt its life-cycle.
Kuzzle waits for their results before continuing the process.

Pipes are a step in the process of handling client requests, thus Kuzzle enforces a timeout on them, rejecting the request altogether if a synchronous listener fails to respond in a timely fashion, and forwarding an appropriate [GatewayTimeoutError]({{ site_base_path }}plugins-reference/plugins-context/errors/#gatewaytimeouterror) error to the client.  
The timeout value can be configured in [Kuzzle configuration file]({{ site_base_path }}guide/essentials/configuration).

Pipes are declared in the `pipes` property of the Plugin class, where the keys of the object are event names and the values are the names of the corresponding listeners.
Each pipes must also be exported.

A single event can be listened by multiple pipes. When this is the case, they behave like middleware functions (like a pipeline). Kuzzle calls them sequentially, without any particular order, piping the data from one function to the other.

Pipes take a callback as their last parameter, which **must** be called at the end of the processing with the following arguments: `callback(error, object)`, where:

* `error`: set this value to a `KuzzleError` object to make Kuzzle abort the request, and return that error to the client. Otherwise, set it to `null`
* `object`: the resulting data, given back to Kuzzle for processing

---

## TL;DR plugin skeleton

The following plugin example adds a `createdAt` attribute to all newly created documents:

```javascript
function PipePlugin () {
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
module.exports = PipePlugin;
```
