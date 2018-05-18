---
layout: full.html.hbs
algolia: true
title: auth
description: list of events emitted by the auth controller
order: 200
---

# auth

{{{since "1.0.0"}}}

Events triggered when a request is sent to the [`auth`]({{ site_base_path }}api-documentation/controller-auth) controller.

---

### `auth:after<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `auth` controller trigger this event after a successful execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: after a successful [logout]({{ site_base_path }}api-documentation/controller-auth/logout/) request, a `auth:afterLogout` event is triggered.

---

### `auth:before<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `auth` controller trigger this event before execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: before performing a [checkToken]({{ site_base_path }}api-documentation/controller-auth/check-token/) request, a `auth:beforeCheckToken` event is triggered.

---

### `auth:error<Action>`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

All actions in the `auth` controller trigger this event after a failed execution. The `<Action>` part of the event name is replaced with the name of the action, where each word starts with a capital letter.

Example: after a failed [login]({{ site_base_path }}api-documentation/controller-auth/login/) request, a `auth:errorLogin` event is triggered.

---

### `auth:strategyAuthenticated`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** Object (see below)

This event is triggered immediately after a successful user authentication, but before a token is generated (and before an `auth:afterLogin` event is triggered).

This event's payload is a plain JSON object with the following properties:
* `strategy`: the [authentication strategy]({{ site_base_path }}guide/essentials/user-authentication/#authentication-strategies) name 
* `content`: an object with the following properties:
  * `_id`: the user's [kuid]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid)
  * `profileIds`: an array of [Profile]({{ site_base_path }}guide/essentials/security/#users-profiles-and-roles) names

---
