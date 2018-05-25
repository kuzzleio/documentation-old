---
layout: full.html.hbs
algolia: true
title: Listen Synchronously
order: 200
---

# Listening Synchronously

Plugins allow you to add synchronous listener functions to a set of [events]({{ site_base_path }}kuzzle-events/). We call these synchronous listener functions **pipes**.

Kuzzle will execute a pipe and wait for the pipe to return a result before continuing its process. The pipe will receive event data and can modify it before it is passed back to the Kuzzle process, allowing it to update or interrupt the request.

Pipes are a step in the Kuzzle request handling process. As such, Kuzzle enforces a timeout, rejecting a request if a synchronous listener fails to respond in the specified timeframe and returning a [GatewayTimeoutError]({{ site_base_path }}plugins-reference/plugins-context/errors/#gatewaytimeouterror) error to the client.  
The Kuzzle synchronous listener timeout value can be configured in the [Kuzzle configuration file]({{ site_base_path }}guide/essentials/configuration).

Pipes are declared in the `pipes` property of the Plugin class, which accepts an object who's keys are the name of the events to listen to and values are the names of the corresponding functions to execute.

A single Kuzzle event can be attached to multiple pipes. When this is the case, they behave like a pipeline: Kuzzle will call each `pipe` sequentially, without any particular order, piping the data from one function to the other.

Pipes accept a callback as an input (in the function's last argument), which **must** be called when the pipe has finished processing the data. The callback should be called with the following arguments: `callback(error, object)`, where:

* `error`: is a `KuzzleError` object if an error ocurred, or `null` if there is no error. If this field is set, then Kuzzle will abort the request and return the error to the client.
* `object`: the result of the `pipe` which is passed back to Kuzzle for processing.

---

## Plugin Sample

The following plugin example adds a `createdAt` attribute to all newly created documents:

```javascript
class PipePlugin {
  constructor () {
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
  }

  /*
    Required plugin initialization function
    (see the "Plugin prerequisites" section)
   */
  init (customConfig, context) {
    // Plugin initialization
  }

  // Called whenever "document:beforeCreate" is fired
  addCreatedAt (request, callback) {
    request.input.body.createdAt = Date.now();
    callback(null, request);
  }
}

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = PipePlugin;
```
