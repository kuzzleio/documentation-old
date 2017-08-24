---
layout: full.html
algolia: true
title: security
description: list of events emitted by the security controller
order: 200
---

# security

{{{since "1.0.0"}}}

Events triggered when a request is sent to the [`security` controller]({{ site_base_path }}api-documentation/controller-security).

---


## `security:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `security` controller trigger this event after a successful execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a successful [getRole]({{ site_base_path }}api-documentation/controller-security/get-role/) request, a `security:afterGetRole` event is triggered.

---

## `security:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `security` controllers trigger this event before execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: before performing a [searchUsers]({{ site_base_path }}api-documentation/controller-security/search-users/) request, a `security:beforeSearchUsers` event is triggered.

---

## `security:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `security` controllers trigger this event after a failed execution, with the `<Action>` part of the event name replaced with the name of the action, capitalized.

Example: after a failed [createUser]({{ site_base_path }}api-documentation/controller-security/create-user/) request, a `security:errorCreateUser` event is triggered.

---

## `security:formatUserForSerialization`

{{{deprecated "1.0.0"}}}

**Event type:** Pipe

**Payload:** a `User` object

Triggered before serializing a user object.

---
