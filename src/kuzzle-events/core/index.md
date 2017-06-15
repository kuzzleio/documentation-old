---
layout: full.html
algolia: true
title: core
description: list of events emitted to synchronize Kuzzle server instances in a cluster
order: 200
---

# core

Events triggered to synchronize Kuzzle server instances in a cluster.

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `core:kuzzleStart` | Hook | Emitted when Kuzzle is started | / |
| `core:hotelClerk:addSubscription` | Hook | Sends a diff containing the filters and internal hotelClerk updates    | Array of `hcR` object |
| `core:hotelClerk:join` | Hook | Sends hotelClerk diff when a room is joined | `hcR` object |
| `core:hotelClerk:removeRoomForCustomer` | Hook | Sends the room unsubscription information if it changed | {connection, roomId} |
| `core:indexCache:add` | Hook | Triggered when data is added to Kuzzle's index cache | {index, collection} |
| `core:indexCache:remove` | Hook | Triggered if some data were actually removed from Kuzzle's index cache | {index, collection} |
| `core:indexCache:reset` | Hook | Triggered if the indexCache is reset | {index} |
| `core:overload` | Hook | Triggered when the overload cache is filling up | Overload percentage. Type: Number |
| `core:profileRepository:save` | Hook | Triggered when a profile is created or updated | {_id, policies} |
| `core:profileRepository:delete` | Hook | Triggered when a profile is deleted | {_id} |
| `core:roleRepository:save` | Hook | Triggered when a role is created or updated | {_id, controllers} |
| `core:roleRepository:delete` | Hook | Triggered when a role is deleted | {_id} |
