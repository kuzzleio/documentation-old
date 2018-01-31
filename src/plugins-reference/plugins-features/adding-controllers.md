---
layout: full.html
algolia: true
title: Add a Controller Route
order: 300
---

# Adding a Controller Route

The Kuzzle Backend API is divided into separate "controllers", each exposing executable "actions" (see [API reference]({{ site_base_path }}api-documentation/query-syntax/common-attributes)).

Plugins allow you to install additional controllers that will be available through the Kuzzle Backend API, each with their own list of available actions.

---

## Controller Route Path

To avoid naming conflicts, the path to the controller added using a plugin will include the plugin name.

### HTTP

**URL:** `http://<server>:<port>/_plugin/<plugin name>/<url defined by the plugin>/<resources>`  
**Method:** `<verb defined by the plugin>`

### Others protocols

```javascript
{
  "controller": "<plugin name>/<added controller name>",
  "action": "<action of the added controller>",
  ...
}
```

---

## Creating a Controller Route

In order to create a new controller, the plugin must expose the following objects:

- A `controllers` object, describing the new controller(s) to add. It will automatically be made available to any network protocol (except for HTTP)
- A `routes` objects, describing how the new controller(s) should be exposed to the HTTP protocol. Only GET and POST verbs are accepted.
- Controller's actions functions. These methods take a `Request` object as an argument, and must return a `Promise` that resolves with the action result or rejects with a KuzzleError object.


---

## From Request to Action

All action functions receive a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object as a main argument. When Kuzzle Backend receives a request, it will parse the data and create the Request object that it then passes to the action. The parsing works as follows:

* HTTP:
  * dynamic arguments provided in the URL, headers and query string arguments are stored in `request.input.args`
  * content body is made available in `request.input.body`
  * if the URL contains an `index`, a `collection` or a `_id` argument, it will be stored in `request.input.resource`

* Other protocols:
  * if the provided JSON object contains a `body` object, then its content will be stored in `request.input.body`
  * the following fields at the root of the provided JSON objects are available in `request.input.resource`: `index`, `collection`, `_id`
  * any unrecognized property at the root of the provided JSON object will be stored in the `request.input.args` part of the `Request` object

---

## Automatic Events Generation

Kuzzle Backend can trigger events on all controller routes, and those added by plugins are no exception.  
Read more about these automatic controller events [here]({{ site_base_path }}kuzzle-events/plugin-events/).


---

## Plugin Sample

```javascript
class ControllerPlugin {
  constructor () {
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

      Kuzzle will call the function 'actionFunction' with a Request object,
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
  }

  /*
    Required plugin initialization function
    (see the "Plugin prerequisites" section)
   */
  init (customConfig, context) {
    // plugin initialization
  }

  /*
    Implements the action newController/myAction
    Takes a Request object as an argument, and MUST return
    a promise resolved (or rejected) with the action's result
    This result can be of any JS type (scalar, object, array), and
    will be used to build a response to send to the requesting client

    See the "How plugins receive action arguments" chapter just below
    for more information.
   */
  actionFunction (request) {
    // do action

    // optional: set network specific headers
    if (request.context.protocol === 'http') {
      // expires in 1h
      request.response.setHeader('expires', new Date(Date.now() + 3600000).toUTCString());
    }

    // Resolve with the result content. For instance:
    return Promise.resolve({acknowledge: true});
  }

  /*
    Implements the action newController/myOtherAction
    Takes a Request object as an argument, and MUST return
    a promise resolved (or rejected) with the action's result
    This result can be of any JS type (scalar, object, array), and
    will be used to build a response to send to the requesting client

    See the "How plugins receive action arguments" chapter just below
    for more information.
   */
  otherActionFunction (request) {
    // do action
    return Promise.resolve(/* result content */);
  }
}

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = ControllerPlugin;
```
