# Essentials

## Offline first

Working with an unstable network connection implies to handle what an application should be doing while being offline.  
Our goal is to provide our users with the right tools to handle such situations.


### Handling a network disconnection

There are two ways to handle a network disconnection:

* Stop all further communication with Kuzzle and invalidate the current instance and all its children. The application will have to manually instantiate a new Kuzzle object once the network has recovered. To do so, simply pass the ``autoReconnect`` option to ``false`` when starting a new Kuzzle instance.
* Reconnect automatically to Kuzzle when possible, and enter *offline mode* in the meantime. This is the default behavior.

Offline mode simply refers to the time between a ``disconnected`` and a ``reconnected`` event (see [Events](#events)).

### Subscriptions

A subscription is a permanent pipe opened between a SDK instance and a Kuzzle server, with a set of filters. Whenever a real-time message or a modified document match these subscription filters, a push notification is sent by Kuzzle to this SDK (for instance, see the [Collection.subscribe](#subscribe) method).

During offline mode, all subscriptions configurations are kept indefinitely, with no maximum subscriptions retained.

By default, upon reconnection, all subscription are renewed. This behavior can be changed by setting the ``autoResubscribe`` to ``false``. In that case, each subscription must be renewed manually using the ``Room.renew`` method.

### API requests

Requests can be queued while being offline, to be replayed once the network connection has been reestablished.  
By default, there is no request queuing.

You can:

* Queue all requests automatically when going offline by setting the ``autoQueue`` option to ``true`` (see [Kuzzle constructor](#constructors))
* Start and stop queuing manually, by using the [startQueuing](#startqueuing) and [stopQueuing](#stopqueuing) methods

The queue itself can be configured using the ``queueTTL`` and ``queueMaxSize`` options.

#### Filtering requests to be queued

After request queuing is activated, by default, all requests are queued.

You can decide to filter some of these requests with the [``queueFilter`` property](#properties). This property must be set with a function taking the request to be queued as an argument, and it must return a boolean telling the Kuzzle SDK if the request can be queued or not.

Additionally, almost all request methods accept a ``queuable`` option. If set to ``false``, the request will be discarded if the SDK is disconnected, and it will be played immediately with no queuing otherwise. This option bypasses the ``queueFilter`` property.


### Handling network reconnection

<aside class="warning">
Setting <code>autoReplay</code> to <code>true</code> when using user authentication should generally be avoided.<br/>
When leaving offline-mode, the JWT Token validity is verified. If it has expired, the token will be removed and a <code>jwtTokenExpired</code> event will be triggered.<br/>
If <code>autoReplay</code> is set, then all pending requests will be automatically played as an anonymous user.
</aside>

Once a ``reconnected`` event is fired, you may replay the content of the queue with the ``replayQueue`` method. Or you can let the SDK replay it automatically upon reconnection, by setting the ``autoReplay`` option to ``true``.  

Requests are sent to Kuzzle with the ``replayInterval`` delay between each one of them.

Requests submitted while replaying the queue are delayed until the queue is empty, to ensure all requests are played in the right order.


### Taking control of the offline queue

You can be notified about what's going on about the offline queue, with the [`offlineQueuePush` and the `offlineQueuePop` events](#events)).  

The `offlineQueuePush` event is fired whenever a request is queued. It provides to its listeners an object containing a `query` property, describing the queued request, and an optional `cb` property containing the corresponding callback, if any.

The `offlineQueuePop` event is fired whenever a request has been removed from the queue, either because the queue limits have been reached, or because the request has been replayed. It provides the removed request to its listeners.

The `offlineQueueLoader` property of the Kuzzle main object allows loading requests to the queue, **before any previously queued request**. It is invoked every time the SDK starts dequeuing requests.  
This property must be set with a function returning an array of objects with the following accessible properties:

* a `query` property, containing the request to be replayed
* an optional `cb` property pointing to the callback to invoke after the completion of the request

Finally, if the provided methods don't give you enough control over the offline queue, you can access and edit the queue directly using the ``offlineQueue`` property.


### Automatic offline-mode

You can set the ``offlineMode`` option to ``auto`` when instantiating the [Kuzzle object](#kuzzle). This configures the offline mode behavior with the following options:

* ``autoReconnect`` = ``true``
* ``autoQueue`` = ``true``
* ``autoReplay`` = ``true``
* ``autoResubscribe`` = ``true``

## Events

The [Kuzzle object](#kuzzle) exposes a set of events triggered on some cases. To subscribe or unsubscribe on these events, simply plug a callback function to the event you want to listen, using the functions [addListener](#addlistener) and [removeListener](#removelistener).

Here is the list of exposed events:

| Event Name | Callback arguments | Description |
|------------|-------------|-------------|
| ``connected`` | _(none)_ | Triggered when the SDK has successfully connected to Kuzzle |
| `discarded` | `error` (object) | Triggered when Kuzzle rejects a request (e.g. request can't be parsed, request too large, ...) |
| ``disconnected`` | _(none)_ |  Triggered when the current session has been unexpectedly disconnected |
| ``error`` | `error` (object) | Triggered when the SDK has failed to connect to Kuzzle. Does not trigger offline mode. |
| ``jwtTokenExpired`` | _(none)_ |  Triggered when Kuzzle rejected a request because the authentication token expired |
| ``loginAttempt`` | `{ "success": <boolean>, "error": "<error message>" }` |  Triggered when a login attempt completes, either with a success or a failure result |
| ``offlineQueuePop`` | `query` (object) | Triggered whenever a request is removed from the offline queue. |
| ``offlineQueuePush`` | `{ "query": <object>, "cb": <function> }` | Triggered whenever a request is added to the offline queue |
| ``queryError`` | `error` (object), `query` (object) | Triggered whenever Kuzzle responds with an error |
| ``reconnected`` | _(none)_ |  Triggered when the current session has reconnected to Kuzzle after a disconnection, and only if ``autoReconnect`` is set to ``true`` |


**Note:** listeners are called in the order of their insertion.

## Handling errors

```js
// Any API request method behave the same way

// Using callbacks (NodeJS or Web Browser)
kuzzle.checkToken(token, function (err, res) {
  if (err) {
    console.error(err.status, ': ', err.message);
    return;
  }
});

// Using promises (NodeJS only)
kuzzle.checkTokenPromise(token)
  .then(res => {
    // ...
  })
  .catch(err => {
    console.error(err.status, ': ', err.message);
    return Promise.reject(err);
  });
```

```java
kuzzle.checkToken("some jwt token", new ResponseListener<TokenValidity>() {
  @Override
  public void onSuccess(TokenValidity tokenInfo) {
    if (tokenInfo.isValid()) {
      // tokenInfo.getExpiresAt() returns the expiration timestamp
    }
    else {
      // tokenInfo.getState() returns the invalidity reason
    }
  }

  @Override
  public void onError(JSONObject error) {
    System.err.println(error.getInt('status') + ': ' + error.getString('message'));
  }
});
```

```php
<?php

try {
  $result = $kuzzle->checkToken('some jwt token');
}
catch (ErrorException $e) {
  var_dump($e->status . ': ' . $e->message);
}
```

All methods taking a callback as an argument may return an error, either directly from the SDK, or as a response from Kuzzle.

All errors returned that way are JSON objects containing the following properties:

* `message`: the error message
* `status`: an error code following the [HTTP standard](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
