---
layout: full.html
algolia: true
title: document
description: list of events emitted by the document controller
order: 200
---

# document

{{{since "1.0.0"}}}

Events triggered when a request is sent to the [`document` controller]({{ site_base_path }}api-documentation/controller-document).

---

## `document:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `document` controller trigger this event after a successful execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a successful [create]({{ site_base_path }}api-documentation/controller-document/create/) request, a `document:afterCreate` event is triggered.

---

## `document:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `document` controllers trigger this event before execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: before performing a [get]({{ site_base_path }}api-documentation/controller-document/get/) request, a `document:beforeGet` event is triggered.

---

## `document:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `document` controllers trigger this event after a failed execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a failed [delete]({{ site_base_path }}api-documentation/controller-document/delete/) request, a `document:errorDelete` event is triggered.

---
