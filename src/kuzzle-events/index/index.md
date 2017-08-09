---
layout: full.html
words: 88
algolia: true
title: index
description: list of events emitted by the index controller
order: 200
---

# index

Events triggered when a request is treated in the [`index` controller]({{ site_base_path }}api-documentation/controller-index).

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `index:after<Action>` | Pipe | All actions in `index` controller trigger an event after executing  | Type: Request |
| `index:before<Action>` | Pipe | All actions in `index` controller trigger an event before executing | Type: Request |
| `index:error<Action>` | Pipe | When an error occurred during an action in `index` controller, an event error is triggered | Type: Request |

