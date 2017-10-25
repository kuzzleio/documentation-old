---
layout: full.html
algolia: true
title: server
description: list of events emitted by the server controller
order: 200
---

# server

{{{since "1.0.0"}}}

Events triggered on server special events or when a request is sent to the [`server` controller]({{ site_base_path }}api-documentation/controller-server).

---


### `server:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `server` controller trigger this event after a successful execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a successful [info]({{ site_base_path }}api-documentation/controller-server/info/) request, a `server:afterInfo` event is triggered.

---

### `server:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `server` controllers trigger this event before execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: before performing a [now]({{ site_base_path }}api-documentation/controller-server/now/) request, a `server:beforeNow` event is triggered.

---

### `server:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `server` controllers trigger this event after a failed execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a failed [delete]({{ site_base_path }}api-documentation/controller-server/admin-exists/) request, a `server:errorAdminExists` event is triggered.

---
