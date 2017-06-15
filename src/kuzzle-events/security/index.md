---
layout: full.html
algolia: true
title: security
description: list of events emitted by the security controller
order: 200
---

# security

Events triggered when a request is sent to the [`security` controller]({{ site_base_path }}api-documentation/controller-security).

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `security:after<Action>` | Pipe | All actions in `security` controller trigger an event after executing | Type: Request |
| `security:before<Action>` | Pipe | All actions in `security` controller trigger an event before executing | Type: Request |
| `security:formatUserForSerialization` | Pipe | Triggered before serializing a user. Useful to clean a user like attribute `password` | Type: User |
| `security:error<Action>` | Pipe | When an error occurred during an action in `security` controller, an event error is triggered | Type: Request |

