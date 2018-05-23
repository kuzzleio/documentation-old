---
layout: full.html.hbs
algolia: true
title: document
description: list of events emitted by the document controller
order: 200
---

# document

{{{since "1.0.0"}}}

Events triggered when a request is sent to the [`document`]({{ site_base_path }}api-documentation/controller-document) controller.

---

### `document:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `document` controller trigger this event after a successful execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: after a successful [create]({{ site_base_path }}api-documentation/controller-document/create/) request, a `document:afterCreate` event is triggered.

---

### `document:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `document` controllers trigger this event before execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: before performing a [get]({{ site_base_path }}api-documentation/controller-document/get/) request, a `document:beforeGet` event is triggered.

---

### `document:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `document` controllers trigger this event after a failed execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: after a failed [delete]({{ site_base_path }}api-documentation/controller-document/delete/) request, a `document:errorDelete` event is triggered.

---
