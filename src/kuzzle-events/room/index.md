---
layout: full.html
words:  81
algolia: true
title: room
description: list of events emitted on subscription rooms activity
order: 200
---

# room

Events triggered on subscription rooms activity.

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `room:new` | Pipe | Triggered when a new room is added in the rooms list. You can't modify the input on this event | Type: Object. <br> `{roomId, index, collection, formattedFilters}` |
| `room:remove` | Pipe | Triggered after a room is removed from the list. You can't modify the input on this event | Type: String.<br> The room id |
