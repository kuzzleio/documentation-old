---
layout: full.html
algolia: true
title: The PluginCcontext
description: plugin initialization context attribute reference
order: 400
show-subheader: true
subheader-title: Introductions
---

# The Plugin Pontext

The plugin context is an object containing a set of constructors, accessors and configurations, allowing plugins to interact with Kuzzle Backend.

The plugin context object is passed to the plugin's `init` function by Kuzzle Backend when it loads the plugin.  
Each plugin will receive its own plugin context instance.

Here is the list of shared objects contained in the ``context``:

| Attribute path | Purpose                      |
|----------------|------------------------------|
| `context.accessors.execute` | Access to Kuzzle Backend API. |
| `context.accessors.trigger` | Trigger a custom event. |
| `context.accessors.storage` | Initiate and configure to the plugin storage. This storage can only be accessed by the plugin and can be used to persist plugin datas. |
| `context.accessors.validation` | Access to validation mechanisms, useful to validate documents and add field types. |
| `context.config` | Contains the entire Kuzzle Backend instance configuration (most of it coming from Kuzzle Backend configuration file) |
| `context.constructors.Dsl` | Constructor allowing plugins to instantiate their own Kuzzle Backend real-time engine instance |
| `context.constructors.Repository` | Constructor allowing plugins to instantiate their Repositories allowing them to interact with their plugin storage |
| `context.constructors.Request` | Constructor for standardized requests sent to Kuzzle Backend |
| `context.constructors.BaseValidationType` | Constructor for the Validation Type base constructor |
| `context.errors.<ErrorConstructor>` |Kuzzle Backend error constructors, built dynamically from available Kuzzle Backend error objects at runtime |
| `context.log.<level>(message)` | Provides methods to log messages depending on their priority level |


