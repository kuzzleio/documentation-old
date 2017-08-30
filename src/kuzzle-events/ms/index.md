---
layout: full.html
algolia: true
title: ms (memoryStorage)
description: list of events emitted by the memoryStorage controller
order: 200
---

# ms (memoryStorage)

{{{since "1.0.0"}}}

Events triggered when a request is sent to the [`memoryStorage` controller]({{ site_base_path }}api-documentation/controller-memory-storage).

---

## `ms:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `ms` controller trigger this event after a successful execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a successful [geoadd]({{ site_base_path }}api-documentation/controller-memory-storage/geoadd/) request, a `ms:afterGeoadd` event is triggered.

---

## `ms:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `ms` controllers trigger this event before execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: before performing a [sunion]({{ site_base_path }}api-documentation/controller-memory-storage/sunion/) request, a `ms:beforeSunion` event is triggered.

---

## `ms:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `ms` controllers trigger this event after a failed execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a failed [smove]({{ site_base_path }}api-documentation/controller-memory-storage/smove/) request, a `ms:errorSmove` event is triggered.

---
