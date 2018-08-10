---
layout: full.html.hbs
algolia: true
title: Protocols
description: Extending Kuzzle communication capabilities
order: 500
---

# Extending Kuzzle communication capabilities

By default, Kuzzle supports HTTP, Websocket and Socket.io protocols. However, you can add more protocols and even create your own.

Protocols are very similar to Plugins, with one major difference: the context they receive from Kuzzle is 


# Installing a Protocol

Adding a new protocol is similar to adding a [plugin]({{ site_base_path }}plugins-reference/managing-plugins/#installing-removing-enabling-and-disabling-plugins)

The only difference is that protocols need to be installed in the `protocols/enabled` directory to be loaded by Kuzzle.


# Configuring a Protocol

Protocols are configured in the [Kuzzle configuration]({{ site_base_path }}guide/essentials/configuration/), under the `server/protocols/<protocol name>` section.

**Example: ** 

```json
{
  "server": {
    "protocols": {
      "mqtt": {
        "port": 1883,
        "allowPubSub": true
      }
    }
  }
}
```

The example above will set the configuration for the [MQTT protocol](https://github.com/kuzzleio/protocol-mqtt)

---
