---
layout: full.html.hbs
algolia: true
title: Specifications
order: 2
---

# Specifications

Protocols are constructors exposed as a Node.js module, and they must implement the following methods:

## broadcast(obj)

Asks Protocol to emit a payload to a list of clients channels, both described in the provided `obj` object:

* `obj.payload` (JSON object): data payload
* `obj.channels` (array of strings): list of channels

## disconnect(connectionId)

Asks Protocol to force-close the connection `connectionId`

## init(EntryPoint, Context)

Initialization function invoked by Kuzzle during startup. 

This function may return a Promise: if so, Kuzzle waits for it to be resolved before resuming its start sequence.

The [Context argument]({{ site_base_path }}plugins-reference/protocols/context) is the Protocol's dedicated context.

## joinChannel(channel, connectionId)

Informs the Protocol that the connection `connectionId` subscribed to the channel `channel`.

plugins-reference/protocols/context

| Method | Arguments | Description                 |
|------|----------------|-----------------------------|
| `disconnect` | `connectionId` |  |
| `init` | `EntryPoint`, `context` |  If a Promise is returned, Kuzzle will wait for it to be resolved before continuing its start sequence |
| `joinChannel` | `channel`, `connectionId`| Tells Protocol that the connection `connectionId` subscribed to the channel `channel` |
| `leaveChannel` | `channel`, `connectionId` | Tells Protocol that the connection `connectionId` left the channel `channel` |
| `notify` | `{channels, connectionId, payload}` | Asks Protocol to emit a data `payload` (pojo object) to the connection `connectionId` (string), on the channels  `channels` (array of strings)|

