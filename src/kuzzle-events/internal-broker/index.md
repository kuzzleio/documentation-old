---
layout: full.html
words: 109
algolia: true
title: internalBroker
description: list of events emitted by Kuzzle internal broker
order: 200
---

# internalBroker

<aside class="warning">Internal use only</aside>

Events triggered by the Kuzzle internal message broker, used to transmit data between Kuzzle instances.

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `internalBroker:connected` | Hook | Triggered when the internal broker is connected    | Type: String.<br> `'Connected to Kuzzle server'` |
| `internalBroker:error` | Hook | Triggered when an error occured in internal broker | Type: Object.<br> {host, port, message, retry} |
| `internalBroker:reregistering` | Hook | Triggered when the internal broker is reregistered | Type: String.<br> `'Re-registering room: ' + room` |
| `internalBroker:socketClosed` | Hook | Triggered when the socket is closed | Type: String |
