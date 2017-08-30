---
layout: full.html
algolia: true
title: collection
description: list of events emitted by the collection controller
order: 200
---

# collection

{{{since "1.0.0"}}}

Events triggered when a request is sent to the [`collection` controller]({{ site_base_path }}api-documentation/controller-collection).

---

## `collection:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `collection` controller trigger this event after a successful execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a successful [create]({{ site_base_path }}api-documentation/controller-collection/create/) request, a `collection:afterCreate` event is triggered.

---

## `collection:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `collection` controllers trigger this event before execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: before performing a [updateMapping]({{ site_base_path }}api-documentation/controller-collection/update-mapping/) request, a `collection:beforeUpdateMapping` event is triggered.

---

## `collection:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `collection` controllers trigger this event after a failed execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a failed [list]({{ site_base_path }}api-documentation/controller-collection/list/) request, a `collection:errorList` event is triggered.

---
