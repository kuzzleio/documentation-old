---
layout: full.html
algolia: true
title: [Plugin events]
description: list of events emitted by plugins
order: 100
---

# [Plugin events]

[Plugins]({{ site_base_path }}plugins-reference/plugins-features/adding-controllers) may add new controllers and actions to Kuzzle's API. These do not differ from native controllers/actions and these, too, trigger events that can be listened by plugins.

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `<pluginName>/<controller>:after<Action>` | Pipe | Triggered after the action `action` of the controller `controller` added by the plugin `pluginName` has completed | Type: Request |
| `<pluginName>/<controller>:before<Action>` | Pipe | Triggered before the action `action` of the controller `controller` added by the plugin `pluginName` has started | Type: Request |
| `<pluginName>/<controller>:error<Action>` | Pipe | When an error occurred during an action in `controller` controller, an event error is triggered | Type: Request |

**Example:**

The plugin `foo` adds a controller named `fooController`, containing an action named `fooAction`.

When an API request invokes this new API route, Kuzzle will automatically trigger the following events:

* `foo/fooController:beforeFooAction` (before the request starts)
* `foo/fooController:afterFooAction` (after the request completes)

And in case of error, will trigger the event:

* `foo/fooController:errorFooAction`
