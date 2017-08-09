---
layout: full.html
words: 93
algolia: true
title: server
description: list of events emitted by the server controller
order: 200
---

# server

Events triggered on server special events or when a request is sent to the [`server` controller]({{ site_base_path }}api-documentation/controller-server).

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `server:after<Action>` | Pipe | All actions in `server` controller trigger an event after executing  | Type: Request |
| `server:before<Action>` | Pipe | All actions in `server` controller trigger an event before executing | Type: Request |
| `server:error<Action>` | Pipe | When an error occurred during an action in `server` controller, an event error is triggered | Type: Request |

