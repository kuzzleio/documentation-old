---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: Kuzzle
description: Entry point and main class for the entire SDK
show-subheader: true
subheader-title: Constructor
order: 100
---

# Constructor

```js
var kuzzle = new Kuzzle('localhost', {
  defaultIndex: 'some index',
  autoReconnect: true,
  port: 7512
});
```

```java
import io.kuzzle.sdk.core.Kuzzle;
import io.kuzzle.sdk.core.Options;

Options options = new Options();

options.setDefaultIndex("some index")
  .setAutoReconnect(true),
  .setPort(7512);

Kuzzle kuzzle = new Kuzzle("localhost", options);
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost', [
  'defaultIndex' => 'some index',
  'port' => 7512
]);
```

This is the main entry point to communicate with Kuzzle. Every other object inherits properties from the `Kuzzle` object.

`Kuzzle` object is a [KuzzleEventEmitter]({{ site_base_path }}sdk-reference/event-emitter/) instance, so that we can listen to global events.

---

## Kuzzle(host, [options])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``host`` | string | The server name (or the IP address) of a Kuzzle Backend installation |
| ``options`` | JSON object | Optional Kuzzle connection configuration |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``autoQueue`` | boolean | Automatically queue all requests during offline mode | ``false`` |
| ``autoReconnect`` | boolean | Automatically reconnect after a connection loss | ``true`` |
| ``autoReplay`` | boolean | Automatically replay queued requests on a ``reconnected`` event | ``false`` |
| ``autoResubscribe`` | boolean | Automatically renew all subscriptions on a ``reconnected`` event | ``true`` |
| ``defaultIndex`` | string | Set the default index to use | |
| ``offlineMode`` | string | Offline mode configuration | ``manual`` |
| ``protocol`` | string | (Javascript only) Network protocol to use to connect to Kuzzle (``websocket`` | ``socketio``) | ``websocket``|
| ``port`` | integer | Kuzzle network port | 7512 |
| ``queueTTL`` | integer | Time a queued request is kept during offline mode, in milliseconds | ``120000`` |
| ``queueMaxSize`` | integer | Number of maximum requests kept during offline mode | ``500`` |
| ``replayInterval`` | integer | Delay between each replayed requests, in milliseconds | ``10`` |
| ``reconnectionDelay`` | integer | number of milliseconds between reconnection attempts | ``1000`` |
| ``sslConnection`` | boolean | Switch Kuzzle connection to SSL mode | ``false`` |
| ``volatile`` | JSON object | Common volatile data, will be sent to all future requests | |

**Notes:**

* the ``offlineMode`` option only accepts the ``manual`` and ``auto`` values

---

## Properties

| Property name | Type | Description | Writable? |
|---------------|------|-------------|:---------:|
| ``autoQueue`` | boolean | Automatically queue all requests during offline mode | Yes |
| ``autoReconnect`` | boolean | Automatically reconnect after a connection loss | No |
| ``autoReplay`` | boolean | Automatically replay queued requests on a ``reconnected`` event |  Yes |
| ``autoResubscribe`` | boolean | Automatically renew all subscriptions on a ``reconnected`` event | No |
| ``defaultIndex`` | string | Kuzzle's default index to use | Yes |
| ``host`` | string | Target Kuzzle host name/address | No |
| ``jwt`` | string | Token used in requests for authentication. | Yes |
| ``offlineQueue`` | JSON object | Contains the queued requests during offline mode | No |
| ``offlineQueueLoader`` | function | Called before dequeuing requests after exiting offline mode, to add items at the beginning of the offline queue | Yes |
| ``port`` | integer | Kuzzle network port | No |
| ``queueFilter`` | function | Called during offline mode. Takes a request object as arguments and returns a boolean, indicating if a request can be queued | Yes |
| ``queueMaxSize`` | integer | Number of maximum requests kept during offline mode | Yes |
| ``queueTTL`` | integer | Time a queued request is kept during offline mode, in milliseconds | Yes |
| ``replayInterval`` | integer | Delay between each replayed requests | Yes |
| ``reconnectionDelay`` | integer | Number of milliseconds between reconnection attempts | No |
| ``sslConnection`` | boolean | Connect to Kuzzle using SSL | No |
| ``volatile`` | JSON object | Common volatile data, will be sent to all future requests | Yes |

**Notes:**

* newly instantiated Kuzzle objects automatically start in [offline mode]({{ site_base_path }}sdk-reference/essentials/offline-first/)
* multiple methods allow passing specific ``volatile`` data. These ``volatile`` data will be merged with the global Kuzzle ``volatile`` object when sending the request, with the request specific ``volatile`` taking priority over the global ones.
* the ``queueFilter`` property is a function taking a JSON object as an argument. This object is the request sent to Kuzzle, following the [Kuzzle API]({{ site_base_path }}api-documentation/query-syntax) format
* if ``queueTTL`` is set to ``0``, requests are kept indefinitely
* The offline buffer acts like a first-in first-out (FIFO) queue, meaning that if the ``queueMaxSize`` limit is reached, older requests are discarded to make room for new requests
* if ``queueMaxSize`` is set to ``0``, an unlimited number of requests is kept until the buffer is flushed
* the ``offlineQueueLoader`` must be set with a function, taking no argument, and returning an array of objects containing a `query` member with a Kuzzle query to be replayed, and an optional `cb` member with the corresponding callback to invoke with the query result
