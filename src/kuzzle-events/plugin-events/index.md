---
layout: full.html.hbs
algolia: true
title: [Plugin Events]
description: list of events emitted by plugins
order: 100
---

# Plugin Events

{{{since "1.0.0"}}}

Plugins can [add new controllers and actions]({{ site_base_path }}plugins-reference/plugins-features/adding-controllers) to Kuzzle's API. These new controllers and actions behave exactly like native controllers and actions. Kuzzle will automatically trigger events when requests are sent to these plugin controllers.

---

#### `<pluginName>/<controller>:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered after the action `action` of the controller `controller` added by the plugin `pluginName` has completed successfully.

Example: if a plugin named `foo` injects a controller named `controller`, containing an action named `action`, then any request successfully processed by that controller/action, triggers a `foo/controller:afterAction`.

---

#### `<pluginName>/<controller>:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered before the action `action` of the controller `controller` added by the plugin `pluginName` has started

Example: if a plugin named `foo` injects a controller named `controller`, containing an action named `action`, then before any request is sent to that controller/action, a `foo/controller:beforeAction` event is triggered.

---

#### `<pluginName>/<controller>:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered after the action `action` of the controller `controller` added by the plugin `pluginName` has completed with an error.

Example: if a plugin named `foo` injects a controller named `controller`, containing an action named `action`, then any request ending in error after being processed by that controller/action, triggers a `foo/controller:afterAction`.

---
