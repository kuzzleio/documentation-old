---
layout: full.html
algolia: true
title: Events
---

# Events

The [Kuzzle object]({{ site_base_path }}sdk-reference/kuzzle/) exposes a set of events triggered on some cases. To subscribe or unsubscribe on these events, simply plug a callback function to the event you want to listen, using the functions [addListener]({{ site_base_path }}sdk-reference/kuzzle/add-listener) and [removeListener]({{ site_base_path }}sdk-reference/kuzzle/remove-listener).

---

## Exposed events

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
