---
layout: full.html
algolia: true
title: Kuzzle events list
description: list of events that plugins can register hooks and pipes
order: 500
---

# Kuzzle events list

Every time Kuzzle receives a request coming from a client, it routes it towards a Controller and an Action, which processes it and sends the result back to the client. Each step of this life-cycle triggers an event. Below are the different types of events that Plugins can listen to.

---

## [Plugins events]

[Plugins]({{ site_base_path }}plugins-reference/plugins-features/adding-controllers) may add new controllers and actions to Kuzzle's API. These do not differ from native controllers/actions and these, too, trigger events that can be listened by plugins.

| Event | Description | Payload |
|-------|-------------|---------|
| `<pluginName>/<controller>:after<Action>` | Triggered after the action `action` of the controller `controller` added by the plugin `pluginName` has completed | Type: Request |
| `<pluginName>/<controller>:before<Action>` | Triggered before the action `action` of the controller `controller` added by the plugin `pluginName` has started | Type: Request |
| `<pluginName>/<controller>:error<Action>` | When an error occurred during an action in `controller` controller, an event error is triggered | Type: Request |

**Example:**

The plugin `foo` adds a controller named `fooController`, containing an action named `fooAction`.

When an API request invokes this new API route, Kuzzle will automatically trigger the following events:

* `foo/fooController:beforeFooAction` (before the request starts)
* `foo/fooController:afterFooAction` (after the request completes)

And in case of error, will trigger the event:

* `foo/fooController:errorFooAction`

---

## auth

Events triggered when a request is treated in the [`auth` controller]({{ site_base_path }}api-documentation/controller-auth)

| Event | Description | Payload |
|-------|-------------|---------|
| `auth:after<Action>`  | All actions in `auth` controller trigger an event after executing  | Type: Request |
| `auth:before<Action>` | All actions in `auth` controller trigger an event before executing | Type: Request |
| `auth:error<Action>` | When an error occurred during an action in `auth` controller, an event error is triggered | Type: Request |

---

## bulk

Events triggered when a request is treated in the [`bulk` controller]({{ site_base_path }}api-documentation/controller-bulk)

| Event | Description | Payload |
|-------|-------------|---------|
| `bulk:afterImport`  | The `import` action in `bulk` controller triggers an event after executing  | Type: Request |
| `bulk:beforeImport` | The `import` action in `bulk` controller triggers an event before executing | Type: Request |
| `bulk:errorImport` | When an error occurred during the action `import` in `bulk` controller, an event error is triggered | Type: Request |

---

## cleanDb

Events triggered when a database reset is asked to the command-line interface.

| Event | Description | Payload |
|-------|-------------|---------|
| `cleanDb:deleteIndexes` | Triggered during `cleanDb` process just before indexes deletion. | Type: Request object.<br> Contains all indexes to delete in `requestObject.data.body.indexes` |
| `cleanDb:done`          | Triggered after indexes deletion.                                | /                                                                                             |
| `cleanDb:error`         | Triggered when an error occurred on clean db                     | Type: Error                                                                                   |

---

## collection

Events triggered when a request is treated in the [`collection` controller]({{ site_base_path }}api-documentation/controller-collection).

| Event | Description | Payload |
|-------|-------------|---------|
| `collection:after<Action>`  | All actions in `collection` controller trigger an event after executing  | Type: Request |
| `collection:before<Action>` | All actions in `collection` controller trigger an event before executing | Type: Request |
| `collection:error<Action>` | When an error occurred during an action in `collection` controller, an event error is triggered | Type: Request |
---

## core

Events triggered to synchronize Kuzzle server instances in a cluster.

| Event | Description | Payload |
|-------|-------------|---------|
| `core:kuzzleStart`                      | Emitted when Kuzzle is started                                         | /                    |
| `core:hotelClerk:addSubscription`       | Sends a diff containing the filters and internal hotelClerk updates    | Array of `hcR` object |
| `core:hotelClerk:join`                  | Sends hotelClerk diff when a room is joined                            | `hcR` object          |
| `core:hotelClerk:removeRoomForCustomer` | Sends the room unsubscription information if it changed                | {connection, roomId} |
| `core:indexCache:add`                   | Triggered when data is added to Kuzzle's index cache                   | {index, collection}  |
| `core:indexCache:remove`                | Triggered if some data were actually removed from Kuzzle's index cache | {index, collection}  |
| `core:indexCache:reset`                 | Triggered if the indexCache is reset                                   | {index}              |
| `core:overload` | Triggered when the overload cache is filling up | Overload percentage. Type: Number |
| `core:profileRepository:save` | Triggered when a profile is created or updated | {_id, policies} |
| `core:profileRepository:delete` | Triggered when a profile is deleted | {_id} |
| `core:roleRepository:save` | Triggered when a role is created or updated | {_id, controllers} |
| `core:roleRepository:delete` | Triggered when a role is deleted | {_id} |

---

## document

Events triggered when a request is treated in the [`document` controller]({{ site_base_path }}api-documentation/controller-document).

| Event | Description | Payload |
|-------|-------------|---------|
| `document:after<Action>`  | All actions in `document` controller trigger an event after executing  | Type: Request |
| `document:before<Action>` | All actions in `document` controller trigger an event before executing | Type: Request |
| `document:error<Action>` | When an error occurred during an action in `document` controller, an event error is triggered | Type: Request |

---

## http

| Event | Description | Payload |
|-------|-------------|---------|
| `http:options` | Triggered whenever a HTTP OPTIONS methods is handled | Type: Request |

---

## index

Events triggered when a request is treated in the [`index` controller]({{ site_base_path }}api-documentation/controller-index).

| Event | Description | Payload |
|-------|-------------|---------|
| `index:after<Action>`  | All actions in `index` controller trigger an event after executing  | Type: Request |
| `index:before<Action>` | All actions in `index` controller trigger an event before executing | Type: Request |
| `index:error<Action>` | When an error occurred during an action in `index` controller, an event error is triggered | Type: Request |

---

## internalBroker

<aside class="warning">Internal use only</aside>

Events triggered by the Kuzzle internal message broker, used to transmit data between Kuzzle instances.

| Event | Description | Payload |
|-------|-------------|---------|
| `internalBroker:connected`     | Triggered when the internal broker is connected    | Type: String.<br> `'Connected to Kuzzle server'`     |
| `internalBroker:error`         | Triggered when an error occured in internal broker | Type: Object.<br> {host, port, message, retry}       |
| `internalBroker:reregistering` | Triggered when the internal broker is reregistered | Type: String.<br> `'Re-registering room: ' + room`   |
| `internalBroker:socketClosed`  | Triggered when the socket is closed                | Type: String                                         |
| `internalBroker:started`       | Triggered when the internal broker is started      | Type: String.<br> `'Internal broker server started'` |

---

## ms (memoryStorage)

Events triggered when a request is sent to the [`memoryStorage` controller]({{ site_base_path }}api-documentation/controller-memory-storage).

| Event | Description | Payload |
|-------|-------------|---------|
|`ms:after<Action>`  | All actions in `memoryStorage` controller trigger an event after executing  | Type: Request |
|`ms:before<Action>` | All actions in `memoryStorage` controller trigger an event before executing | Type: Request |
| `ms:error<Action>` | When an error occurred during an action in `ms` controller, an event error is triggered | Type: Request |
---

## prepareDb

Events triggered during Kuzzle startup, when the database is prepared for Kuzzle's use.

| Event | Description | Payload |
|-------|-------------|---------|
| `prepareDb:createFixturesIndex`   | Triggered during database preparation. Called for each index in fixtures         | Type: Request.<br> Contains the index to create in `requestObject.index`                                |
| `prepareDb:createInternalIndex`   | Triggered on Kuzzle start to create the internal index `%kuzzle`                 | Type: Request.<br> Contains the internal index in `requestObject.index`                                 |
| `prepareDb:error`                 | Triggered when an error occurred during database preparation                     | Type: Error.                                                                                            |
| `prepareDb:importFixtures`        | Triggered during database preparation. Called for each fixtures to import        | Type: Request.<br> Contains the index in `requestObject.index` and bulk in `requestObject.data.body`    |
| `prepareDb:importMapping`         | Triggered during database preparation. Called for each mapping to import         | Type: Request.<br> Contains the index in `requestObject.index` and mapping in `requestObject.data.body` |
| `prepareDb:updateMappingProfiles` | Triggered on Kuzzle start to create the internal mapping for Profiles collection | Type: Request.<br> Contains the default mapping in `requestObject.data.body`                            |
| `prepareDb:updateMappingRoles`    | Triggered on Kuzzle start to create the internal mapping for Roles collection    | Type: Request.<br> Contains the default mapping in `requestObject.data.body`                            |
| `prepareDb:updateMappingUsers`    | Triggered on Kuzzle start to create the internal mapping for Users collection    | Type: Request.<br> Contains the default mapping in `requestObject.data.body`                            |

---

## realtime

Events triggered when a request is sent to the [`realtime` controller]({{ site_base_path }}api-documentation/controller-realtime).

| Event | Description | Payload |
|-------|-------------|---------|
|`realtime:after<Action>`  | All actions in `realtime` controller trigger an event after executing  | Type: Request |
|`realtime:before<Action>` | All actions in `realtime` controller trigger an event before executing | Type: Request |
|`realtime:error<Action>` | When an error occurred during an action in `realtime` controller, an event error is triggered | Type: Request |
---

## request (event)

Global events triggered on requests execution.

| Event | Description | Payload |
|-------|-------------|---------|
|`request:onAuthorized` | Triggered when a request passed authorization checks and is ready to be processed. Triggered before any `<controller>:before<Action>` event | Type: Request |
|`request:onError` | Triggered when a request execution fails. Triggered after any `<controller>:after<Action>` event | Type: Request |
|`request:onSuccess` | Triggered when a request execution succeeds. Triggered after any `<controller>:after<Action>` event | Type: Request |
|`request:onUnauthorized` | Triggered when a request failed authorization checks and is about to be rejected with a `401` error code. | Type: Request |

---

## room

Events triggered on subscription rooms activity.

| Event | Description | Payload |
|-------|-------------|---------|
| `room:new`    | Triggered when a new room is added in the rooms list. You can't modify the input on this event | Type: Object. <br> `{roomId, index, collection, formattedFilters}` |
| `room:remove` | Triggered after a room is removed from the list. You can't modify the input on this event      | Type: String.<br> The room id                                      |

---

## security

Events triggered when a request is sent to the [`security` controller]({{ site_base_path }}api-documentation/controller-security).

| Event | Description | Payload |
|-------|-------------|---------|
| `security:after<Action>`              | All actions in `security` controller trigger an event after executing                 | Type: Request |
| `security:before<Action>`             | All actions in `security` controller trigger an event before executing                | Type: Request |
| `security:formatUserForSerialization` | Triggered before serializing a user. Useful to clean a user like attribute `password` | Type: User    |
| `security:error<Action>` | When an error occurred during an action in `security` controller, an event error is triggered | Type: Request |
---

## server

Events triggered on server special events or when a request is sent to the [`server` controller]({{ site_base_path }}api-documentation/controller-server).

| Event | Description | Payload |
|-------|-------------|---------|
| `server:after<Action>`  | All actions in `server` controller trigger an event after executing  | Type: Request                                                         |
| `server:before<Action>` | All actions in `server` controller trigger an event before executing | Type: Request                                                         |
| `server:error<Action>` | When an error occurred during an action in `server` controller, an event error is triggered | Type: Request                                                         |

