---
layout: full.html
algolia: true
title: Add an Authentication Strategy
order: 400
---

# Adding an Authentication Strategy


Plugins can be used to extend Kuzzle Backend's security and authentication mechanism.

Any authentication strategy supported by [Passport.js](http://passportjs.org/) can be plugged into Kuzzle Backend and used as part of the security layer. For example, our official [OAUTH2 Authentication plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth) can add the Oauth2 authentication strategy to your Kuzzle Backend installation.

---

## Choosing or Implementing a Strategy

[Passport.js](http://passportjs.org) supports a wide range of authentication strategies. However, if that is not enough, you can implement your own strategy by coding it yourself.

Once you have decided on an authentication strategy, the corresponding plugin module must either be referenced in the NPM dependencies or copied directly into the plugin repository, such that Kuzzle Backend can load the plugin when it boots.

---

## Exposing Authentication Strategies
 The actual name of this function can be set in the `strategies` object using the `validate` method.
There are two ways of declaring authentication strategies:

* By exposing a `strategies` object in an authentication plugin instance that lists each strategy and its properties. This object cannot be empty, and must contain one key/value pair for each strategy you want to use, with the key being the name of the strategy.
* By [dynamically adding or removing strategies]({{ site_base_path }}plugins-reference/plugins-context/accessors/#strategies).

Whether strategies are added statically or dynamically, a `strategies` object must always be provided with the following structure:

* config: an object containing the strategy configuration 
  * constructor: The constructor of the Passport.js strategy
  * strategyOptions: The options provided to the Passport.js strategy constructor
  * authenticateOptions: The options provided to the Passport's [authenticate method](http://passportjs.org/docs/authenticate).
  * fields: The list of fields that can be provided to the plugin.
* methods: an object containing the list of exposed methods
  * afterRegister: The name of the `afterRegister` function in the plugin object.
  * create: [mandatory] The name of the `create` function in the plugin object.
  * delete: [mandatory] The name of the `delete` function in the plugin object.
  * exists: [mandatory] The name of the `exists` function in the plugin object.
  * getById: The name of the `getById` function in the plugin object.
  * getInfo: The name of the `getInfo` function in the plugin object.
  * update: [mandatory] The name of the `update` function in the plugin object.
  * validate: [mandatory] The name of the `validate` function in the plugin object.
  * verify: [mandatory] The name of the `verify` function in the plugin object.

Even though each strategy must declare its own set of properties, the same strategy method can be used by multiple strategies.

---

## The 'verify' Function

You have to implement a [`verify`](http://passportjs.org/docs/configure) function, which will be used by Kuzzle Backend to grant or to deny access to a user. The actual name of this function can be set in the `strategies` object using the `verify` method.

The number of arguments taken by the `verify` function will depend on the authentication strategy. For instance, a `local` authentication strategy requires that the `verify` function validate both a `username` and `password`, so these two arguments will be input to the `verify` function.

Here is the generic signature for the `verify` function:

`verify(payload, ...)`

* `payload` is the login request made to passport
* `...`: additional arguments depending on the authentication strategy

The `payload` argument is a simple JSON object that contains the following attributes:
* `original`: the [Request object]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) containing the login request
* `query`: a direct link to `original.input.args`, containing the optional request arguments
* `body`: a direct link to `original.input.body`, containing the request body content

The `verify` function **must** return a `Promise` that resolves to an object that can contain two attributes: `kuid` and `message`. If the user is authenticated, the `kuid` attribute must contain the [kuid]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid) of the user, else the `kuid` should be null and the `message` attribute must contain a string detailing the reason the user cannot be authenticated. The function should reject the Promise if an error occurs (note: an authentication rejection is *not* an error).

---

## The 'exists' Function

You have to implement an `exists` function, which will be used by Kuzzle Backend to check whether or not a user has credentials for the given strategy. The actual name of this function can be set in the `strategies` object using the `exists` method.

Here is the generic signature of the `exists` function:

`exists (request, kuid, strategy)`

* `request` is the request made to Kuzzle Backend (see [the `Request` documentation]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request)).
* `kuid` is the user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid).
* `strategy` is the name of the strategy.

The function **must** return a `Promise` that resolves to a boolean specifying if the user has credentials for the given strategy.

---

## The 'create' Function

You have to implement a `create` function that will be used by Kuzzle Backend to add user credentials for the given strategy. The actual name of this function can be set in the `strategies` object using the `create` method.

Here is the generic signature of the `create` function:

`create (request, credentials, kuid, strategy)`

* `request` is the request made to Kuzzle Backend (see [the `Request` documentation]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request)).
* `credentials` is the content of the credentials to create that have already been passed to your `validate` function.
* `kuid` is the user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid).
* `strategy` is the name of the strategy.

The function **must** return a `Promise` that resolves to an object that contains **non sensitive** information from the credentials object (it can be an empty object).

<aside class="warning">
  The credentials have to be persisted, either by using the <a href="{{ site_base_path }}plugins-reference/plugins-context/constructors/#repository">Repository constructor</a>, or any external service.
</aside>

---

## The 'update' Function

You have to implement an `update` function that will be used by Kuzzle Backend to update a user's credentials for the given strategy. The actual name of this function can be set in the `strategies` object using the `update` method.

Here is the generic signature of the `update` function:

`update (request, credentials, kuid, strategy)`

* `request` is the request made to Kuzzle Backend (see [the `Request` documentation]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request)).
* `credentials` is the content of the credentials to create, that have already been passed to your `validate` function.
* `kuid` is the user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid).
* `strategy` is the name of the strategy.

The function **must** return a `Promise` that resolves to an object that contains **non sensitive** information from the credentials object (it can be an empty object).

<aside class="warning">
  The credentials have to be persisted, either by using the <a href="{{ site_base_path }}plugins-reference/plugins-context/constructors/#repository">Repository constructor</a>, or any external service.
</aside>

---

## The 'delete' Function

You have to implement a `delete` function that will be used by Kuzzle Backend to delete a user's credentials for the given strategy. The actual name of this function can be set in the `strategies` object using the `delete` method.

Here is the generic signature of the `delete` function:

`delete (request, kuid, strategy)`

* `request` is the request made to Kuzzle Backend (see [the `Request` documentation]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request)).
* `kuid` is the user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid).
* `strategy` is the name of the strategy.

The function **must** return a `Promise` that resolves to any value if the delete succeeds.

---

## The 'getInfo' Function

You can implement a `getInfo` function that will be used by Kuzzle Backend to get information about a user's credentials for the given strategy. The actual name of this function can be set in the `strategies` object using the `getInfo` method.

<aside class="warning">
Kuzzle Backend will NEVER expose data managed by plugins. Plugins are entirely responsible for the data they expose.<br/>
For security reasons, only NON SENSITIVE information should be returned by this method.
</aside>

Here is the generic signature of the `getInfo` function:

`getInfo (request, kuid, strategy)`

* `request` is the request made to Kuzzle Backend (see [the `Request` documentation]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request)).
* `kuid` is the user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid).
* `strategy` is the name of the strategy.

The function **must** return a `Promise` that resolves to an object that contains **non sensitive** information from the credentials object (it can be an empty object).

<aside class="info">
  If no getInfo function is provided, an empty object will be returned to the controllers that call this function.
</aside>

---

## The 'getById' Function

You can implement a `getById` function that will be used by Kuzzle Backend to get information about a user's credentials for the strategy identified by its (`_id`). For security reasons, only **non sensitive** informations should be returned. The actual name of this function can be set in the `strategies` object using the `getById` method.

Here is the generic signature of the `getById` function:

`getById (request, id, strategy)`

* `request` is the request made to Kuzzle Backend (see [the `Request` documentation]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request)).
* `id` is the user's storage identifier in the strategy.
* `strategy` is the name of the strategy

The function **must** return a `Promise` that resolves to an object that contains **non sensitive** information from the credentials object (it can be an empty object).

<aside class="info">
  If no getById function is provided, an empty object will be returned to the controllers that call it.
</aside>

---

## The 'afterRegister' Function

You can implement an `afterRegister` function, which will be called once the strategy constructor has completed. The actual name of this function can be set in the `strategies` object using the `afterRegister` method.

Here is the generic signature of the `afterRegister` function:

`afterRegister (constructedStrategy)`

* `constructedStrategy` is the instance of the Passport.js strategy constructor.

The function **can** return any value as it will be ignored.

<aside class="info"> The actual name of this function can be set in the `strategies` object using the `validate` method.
  If no afterRegister function is provided, Kuzzle Backend will skip this step.
</aside>

---

## The 'validate' Function

You will need to implement a `validate` function that will be used by Kuzzle Backend to check if the provided credentials for the given strategy are formatted correctly. The actual name of this function can be set in the `strategies` object using the `validate` method.

Here is the generic signature of the `validate` function:

`validate (request, credentials, kuid, strategy, isUpdate)`

* `request` is the request made to Kuzzle Backend (see [the `Request` documentation]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request)).
* `credentials` is the content of the credentials to create or update.
* `kuid` is the user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid).
* `strategy` is the name of the strategy
* `isUpdate` is true if `validate` is called during an update.

The function **must** return a `Promise` that resolves or rejects with a detailed error.

<aside class="warning">
  Validate can be called during an update with partial information. The validation should behave accordingly when **isUpdate** is **true**, knowing that mandatory information should already have been stored during a previous create call.
</aside>

---


## Plugin Sample

Here is a sample authentication plugin:

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
          // The constructor of the passport strategy 
          constructor: StrategyConstructor,

          // Options provided to the strategy constructor at instantiation
          strategyOptions: {},

          // Options provided to the authenticate function during the authentication process
          authenticateOptions: {
            scope: []
          },

          // The list of fields that have to be provided in the credentials
          fields: ['login', 'password']
        },
        methods: {
          // (optional) The name of the afterRegister function
          afterRegister: 'afterRegister',
          // The name of the create function
          create: 'create',
          // The name of the delete function
          delete: 'delete',
          // The name of the exists function
          exists: 'exists',
          // (optional) The name of the getById function
          getById: 'getById',
          // (optional) The name of the getInfo function
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
   * Optional.
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
   * Optional.
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
   * Optional.
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
   * @param {string} strategy
   * @param {boolean} isUpdate
   * @returns {Promise<boolean>}
   */
  validate (request, credentials, kuid, strategy, isUpdate) {
    // validate credentials
    Promise.resolve(/* true|false */);
  }

  /**
   * Provided to the Passport.js strategy as verify function
   * Should return the kuid if the user can authentify
   * or an object with the login failure reason as message attribute
   *
   * @param {KuzzleRequest} request
   * @param {*[]} credentials - provided arguments depends on the Passport.js strategy
   * @returns {Promise<string|{message: string}>}
   */
  verify (request, ...credentials) {
    // verify if the user can authentify
    const kuid = getUserIdFromCredentials(credentials);

    if (kuid) {
      return Promise.resolve(kuid);
    }

    return Promise.resolve({message: 'Login failed - You shall not pass! Reason: ...'});
  }
}

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = AuthenticationPlugin;
```
