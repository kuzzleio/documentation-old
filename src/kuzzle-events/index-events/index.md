---
layout: full.html
algolia: true
title: index
description: list of events emitted by the index controller
order: 200
---

# index

{{{since "1.0.0"}}}

Events triggered when a request is sent to the [`index`]({{ site_base_path }}api-documentation/controller-index) controller.

---

### `index:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `index` controller trigger this event after a successful execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: after a successful [create]({{ site_base_path }}api-documentation/controller-index/create/) request, a `index:afterCreate` event is triggered.

---

### `index:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `index` controllers trigger this event before execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: before performing a [list]({{ site_base_path }}api-documentation/controller-index/list/) request, a `index:beforeList` event is triggered.

---

### `index:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `index` controllers trigger this event after a failed execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: after a failed [delete]({{ site_base_path }}api-documentation/controller-index/delete/) request, a `index:errorDelete` event is triggered.

---
