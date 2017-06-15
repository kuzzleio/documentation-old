---
layout: full.html
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
