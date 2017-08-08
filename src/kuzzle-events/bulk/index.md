---
layout: full.html
words:  91
algolia: true
title: bulk
description: list of events emitted by the bulk controller
order: 200
---

# bulk

Events triggered when a request is treated in the [`bulk` controller]({{ site_base_path }}api-documentation/controller-bulk)

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `bulk:afterImport` | Pipe | The `import` action in `bulk` controller triggers an event after executing | Type: Request |
| `bulk:beforeImport` | Pipe | The `import` action in `bulk` controller triggers an event before executing | Type: Request |
| `bulk:errorImport` | Pipe | When an error occurred during the action `import` in `bulk` controller, an event error is triggered | Type: Request |
