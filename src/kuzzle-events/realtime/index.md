---
layout: full.html
algolia: true
title: realtime
description: list of events emitted by the realtime controller
order: 200
---

# realtime

{{{since "1.0.0"}}}

Events triggered when a request is sent to the [`realtime` controller]({{ site_base_path }}api-documentation/controller-realtime).

---

### `realtime:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `realtime` controller trigger this event after a successful execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a successful [subscribe]({{ site_base_path }}api-documentation/controller-realtime/subscribe/) request, a `realtime:afterSubscribe` event is triggered.

---

### `realtime:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `realtime` controllers trigger this event before execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: before performing a [publish]({{ site_base_path }}api-documentation/controller-realtime/publish/) request, a `realtime:beforePublish` event is triggered.

---

### `realtime:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `realtime` controllers trigger this event after a failed execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a failed [join]({{ site_base_path }}api-documentation/controller-realtime/join/) request, a `realtime:errorJoin` event is triggered.

---
