---
layout: full.html
words: 85
algolia: true
title: realtime
description: list of events emitted by the realtime controller
order: 200
---

# realtime

Events triggered when a request is sent to the [`realtime` controller]({{ site_base_path }}api-documentation/controller-realtime).

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
|`realtime:after<Action>` | Pipe | All actions in `realtime` controller trigger an event after executing | Type: Request |
|`realtime:before<Action>` | Pipe | All actions in `realtime` controller trigger an event before executing | Type: Request |
|`realtime:error<Action>` | Pipe | When an error occurred during an action in `realtime` controller, an event error is triggered | Type: Request |