---
layout: full.html
algolia: true
title: index
description: list of events emitted by the index controller
order: 200
---

# index

{{{since "1.0.0"}}}

Events triggered when a request is sent to the [`index` controller]({{ site_base_path }}api-documentation/controller-index).

---

### `index:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `index` controller trigger this event after a successful execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a successful [create]({{ site_base_path }}api-documentation/controller-index/create/) request, a `index:afterCreate` event is triggered.

---

### `index:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `index` controllers trigger this event before execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: before performing a [list]({{ site_base_path }}api-documentation/controller-index/list/) request, a `index:beforeList` event is triggered.

---

### `index:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `index` controllers trigger this event after a failed execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a failed [delete]({{ site_base_path }}api-documentation/controller-index/delete/) request, a `index:errorDelete` event is triggered.

---
