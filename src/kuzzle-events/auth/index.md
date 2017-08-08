---
layout: full.html
words:  121
algolia: true
title: auth
description: list of events emitted by the auth controller
order: 200
---

# auth

Events triggered when a request is treated in the [`auth` controller]({{ site_base_path }}api-documentation/controller-auth)

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `auth:after<Action>` | Pipe | All actions in `auth` controller trigger an event after executing | Type: Request |
| `auth:before<Action>` | Pipe | All actions in `auth` controller trigger an event before executing | Type: Request |
| `auth:error<Action>` | Pipe | When an error occurred during an action in `auth` controller, an event error is triggered | Type: Request |
| `auth:strategyAuthenticated` | Pipe | Triggered after an authentication success on passport wrapper, and before resolving the user. | Type: Object.<br>{strategy, content}<br>`strategy` is the used strategy's name<br>`content` is the authenticated User object |
