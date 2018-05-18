---
layout: full.html.handlebars
algolia: true
title: core
description: list of events emitted to synchronize Kuzzle server nodes in a cluster
order: 200
---

# core

{{{since "1.0.0"}}}

Events triggered to synchronize Kuzzle server nodes in a cluster.

---

### `core:auth:strategyAdded`

{{{since "1.2.0"}}}

**Event type:** Hook

**Payload:** Object (see below)

This event is triggered whenever a plugin registers an [authentication strategy]({{ site_base_path }}guide/essentials/user-authentication/#authentication-strategies) **dynamically** (see [PluginContext]({{ site_base_path }}plugins-reference/plugins-context/accessors/#add)).  
This event is NOT triggered when plugins register authentication strategies by exposing [a strategies object]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy/#exposing-authentication-strategies).
The payload is a plain JSON object with the following properties:

* `pluginName`: the name of the plugin having registered a strategy
* `name`: authentication strategy name
* `strategy`: authentication strategy properties, identical to the content of the [strategies object]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy/#exposing-authentication-strategies) for a given strategy

---

### `core:auth:strategyRemoved`

{{{since "1.2.0"}}}

**Event type:** Hook

**Payload:** Object (see below)

This event is triggered whenever a plugin removes an [authentication strategy]({{ site_base_path }}guide/essentials/user-authentication/#authentication-strategies) **dynamically** (see [PluginContext]({{ site_base_path }}plugins-reference/plugins-context/accessors/#remove)).  

The payload is a plain JSON object with the following properties:

* `pluginName`: the name of the plugin having registered a strategy
* `name`: authentication strategy name

---

### `core:kuzzleStart`

{{{since "1.0.0"}}}

**Event type:** Hook

Triggered when Kuzzle has finished booting and is ready to process user requests.

---

### `core:overload`

{{{since "1.0.0"}}}

**Event type:** Hook

**Payload:** Request buffer fill percentage (number)

Kuzzle features an overload-protection system, configurable through the `limits` parameters in the `.kuzzlerc` file (see [Configuring Kuzzle]({{ site_base_path }}guide/essentials/configuration/)).

This feature allows only a small number of requests to be processed simultaneously. If more requests are to be processed, then they are stored in a buffer until some of the running requests have completed.

If requests are buffered more rapidly than they are processed, Kuzzle enters `overload` mode and will trigger this event regularly to send updates about the state of the request buffer.

Any request submitted while the request buffer is completely filled (i.e. the payload is equal to `100`) will be automatically rejected.

---
