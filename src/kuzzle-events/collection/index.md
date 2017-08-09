---
layout: full.html
words: 88
algolia: true
title: collection
description: list of events emitted by the collection controller
order: 200
---

# collection

Events triggered when a request is treated in the [`collection` controller]({{ site_base_path }}api-documentation/controller-collection).

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `collection:after<Action>` | Pipe | All actions in `collection` controller trigger an event after executing | Type: Request |
| `collection:before<Action>` | Pipe | All actions in `collection` controller trigger an event before executing | Type: Request |
| `collection:error<Action>` | Pipe | When an error occurred during an action in `collection` controller, an event error is triggered | Type: Request |
