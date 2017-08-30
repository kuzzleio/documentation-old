---
layout: full.html
algolia: true
title: room
description: list of events emitted on subscription rooms activity
order: 200
---

# room

{{{since "1.0.0"}}}

Events triggered on real-time rooms activity.

---

## `room:new`

**Event type:** Hook

**Payload:** Object (see below)

Triggered whenever a room is created by a real-time subscription.  

This event payload is a plain JSON object with the following properties:
* `index`: data index name
* `collection`: data collection name
* `roomId`: the new room unique identifier

---

## `room:remove`

**Event type:** Hook

**Payload:** Room unique identifier

Triggered whenever a real-time room is destroyed.

---
