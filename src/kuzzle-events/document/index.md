---
layout: full.html
words: 88
algolia: true
title: document
description: list of events emitted by the document controller
order: 200
---

# document

Events triggered when a request is treated in the [`document` controller]({{ site_base_path }}api-documentation/controller-document).

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `document:after<Action>` | Pipe | All actions in `document` controller trigger an event after executing | Type: Request |
| `document:before<Action>` | Pipe | All actions in `document` controller trigger an event before executing | Type: Request |
| `document:error<Action>` | Pipe | When an error occurred during an action in `document` controller, an event error is triggered | Type: Request |
