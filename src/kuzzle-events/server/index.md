---
layout: full.html.handlebars
algolia: true
title: server
description: list of events emitted by the server controller
order: 200
---

# server

{{{since "1.0.0"}}}

Events triggered on server special events or when a request is sent to the [`server`]({{ site_base_path }}api-documentation/controller-server) controller.

---


### `server:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `server` controller trigger this event after a successful execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: after a successful [info]({{ site_base_path }}api-documentation/controller-server/info/) request, a `server:afterInfo` event is triggered.

---

### `server:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `server` controllers trigger this event before execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: before performing a [now]({{ site_base_path }}api-documentation/controller-server/now/) request, a `server:beforeNow` event is triggered.

---

### `server:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `server` controllers trigger this event after a failed execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: after a failed [delete]({{ site_base_path }}api-documentation/controller-server/admin-exists/) request, a `server:errorAdminExists` event is triggered.

---
