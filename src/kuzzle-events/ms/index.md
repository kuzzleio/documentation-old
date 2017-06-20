---
layout: full.html
algolia: true
title: ms (memoryStorage)
description: list of events emitted by the memoryStorage controller
order: 200
---

# ms (memoryStorage)

Events triggered when a request is sent to the [`memoryStorage` controller]({{ site_base_path }}api-documentation/controller-memory-storage).

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
|`ms:after<Action>` | Pipe | All actions in `memoryStorage` controller trigger an event after executing | Type: Request |
|`ms:before<Action>` | Pipe | All actions in `memoryStorage` controller trigger an event before executing | Type: Request |
| `ms:error<Action>` | Pipe | When an error occurred during an action in `ms` controller, an event error is triggered | Type: Request |