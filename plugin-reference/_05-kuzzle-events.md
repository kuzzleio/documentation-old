## Kuzzle events list


### > event: auth

Events triggered when a request is treated in the [`auth` controller](http://kuzzle.io/api-reference/#auth-controller).

| Event                 | Description                                                        | Input         |
|-----------------------|--------------------------------------------------------------------|---------------|
| `auth:after<Action>`  | All actions in `auth` controller trigger an event after executing  | Type: Request |
| `auth:before<Action>` | All actions in `auth` controller trigger an event before executing | Type: Request |


### > event: bulk

Events triggered when a request is treated in the [`bulk` controller](http://kuzzle.io/api-reference/#bulk-controller).

| Event               | Description                                                                 | Input         |
|---------------------|-----------------------------------------------------------------------------|---------------|
| `bulk:afterImport`  | The `import` action in `bulk` controller triggers an event after executing  | Type: Request |
| `bulk:beforeImport` | The `import` action in `bulk` controller triggers an event before executing | Type: Request |


### > event: cleanDb

Events triggered when a database reset is asked to the command-line interface.

| Event                   | Description                                                      | Input                                                                                         |
|-------------------------|------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `cleanDb:deleteIndexes` | Triggered during `cleanDb` process just before indexes deletion. | Type: Request object.<br> Contains all indexes to delete in `requestObject.data.body.indexes` |
| `cleanDb:done`          | Triggered after indexes deletion.                                | /                                                                                             |
| `cleanDb:error`         | Triggered when an error occurred on clean db                     | Type: Error                                                                                   |


### > event: collection

Events triggered when a request is treated in the [`collection` controller](http://kuzzle.io/api-reference/#collection-controller).

| Event                       | Description                                                              | Input         |
|-----------------------------|--------------------------------------------------------------------------|---------------|
| `collection:after<Action>`  | All actions in `collection` controller trigger an event after executing  | Type: Request |
| `collection:before<Action>` | All actions in `collection` controller trigger an event before executing | Type: Request |


### > event: core

Events triggered to synchronize Kuzzle server instances in a cluster.

| Event                                   | Description                                                            | Input                |
|-----------------------------------------|------------------------------------------------------------------------|----------------------|
| `core:kuzzleStart`                      | Emitted when Kuzzle is started                                         | /                    |
| `core:hotelClerk:addSubscription`       | Sends a diff containing the filters and internal hotelClerk updates    | hcR object           |
| `core:hotelClerk:join`                  | Sends hotelClerk diff when a room is joined                            | hcR object           |
| `core:hotelClerk:removeRoomForCustomer` | Sends the room unsubscription information if it changed                | {connection, roomId} |
| `core:indexCache:add`                   | Triggered when data is added to Kuzzle's index cache                   | {index, collection}  |
| `core:indexCache:remove`                | Triggered if some data were actually removed from Kuzzle's index cache | {index, collection}  |
| `core:indexCache:reset`                 | Triggered if the indexCache is reset                                   | {index}              |
| `core:overload` | Triggered when the overload cache is filling up | Overload percentage. Type: Number |


### > event: index

Events triggered when a request is treated in the [`index` controller](http://kuzzle.io/api-reference/#index-controller).

| Event                  | Description                                                         | Input         |
|------------------------|---------------------------------------------------------------------|---------------|
| `index:after<Action>`  | All actions in `index` controller trigger an event after executing  | Type: Request |
| `index:before<Action>` | All actions in `index` controller trigger an event before executing | Type: Request |


### > event: document

Events triggered when a request is treated in the [`document` controller](http://kuzzle.io/api-reference/#document-controller).

| Event                     | Description                                                            | Input         |
|---------------------------|------------------------------------------------------------------------|---------------|
| `document:after<Action>`  | All actions in `document` controller trigger an event after executing  | Type: Request |
| `document:before<Action>` | All actions in `document` controller trigger an event before executing | Type: Request |

### > event: http

| Event                     | Description                                                            | Input         |
|---------------------------|------------------------------------------------------------------------|---------------|
| `http:options` | Triggered whenever a HTTP OPTIONS methods is handled | Type: Request |

### > event: internalBroker

<aside class="warning">Internal use only</aside>

Events triggered by the Kuzzle internal message broker, used to transmit data between Kuzzle instances.

| Event                          | Description                                        | Input                                                |
|--------------------------------|----------------------------------------------------|------------------------------------------------------|
| `internalBroker:connected`     | Triggered when the internal broker is connected    | Type: String.<br> `'Connected to Kuzzle server'`     |
| `internalBroker:error`         | Triggered when an error occured in internal broker | Type: Object.<br> {host, port, message, retry}       |
| `internalBroker:reregistering` | Triggered when the internal broker is reregistered | Type: String.<br> `'Re-registering room: ' + room`   |
| `internalBroker:socketClosed`  | Triggered when the socket is closed                | Type: String                                         |
| `internalBroker:started`       | Triggered when the internal broker is started      | Type: String.<br> `'Internal broker server started'` |


### > event: ms (memoryStorage)

Events triggered when a request is sent to the [`memoryStorage` controller](http://kuzzle.io/api-reference/#memorystorage-controller).

| Event              | Description                                                                 | Input         |
|--------------------|-----------------------------------------------------------------------------|---------------|
|`ms:after<Action>`  | All actions in `memoryStorage` controller trigger an event after executing  | Type: Request |
|`ms:before<Action>` | All actions in `memoryStorage` controller trigger an event before executing | Type: Request |


### > event: prepareDb

Events triggered during Kuzzle startup, when the database is prepared for Kuzzle's use.

| Event                             | Description                                                                      | Input                                                                                                   |
|-----------------------------------|----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `prepareDb:createFixturesIndex`   | Triggered during database preparation. Called for each index in fixtures         | Type: Request.<br> Contains the index to create in `requestObject.index`                                |
| `prepareDb:createInternalIndex`   | Triggered on Kuzzle start to create the internal index `%kuzzle`                 | Type: Request.<br> Contains the internal index in `requestObject.index`                                 |
| `prepareDb:error`                 | Triggered when an error occurred during database preparation                     | Type: Error.                                                                                            |
| `prepareDb:importFixtures`        | Triggered during database preparation. Called for each fixtures to import        | Type: Request.<br> Contains the index in `requestObject.index` and bulk in `requestObject.data.body`    |
| `prepareDb:importMapping`         | Triggered during database preparation. Called for each mapping to import         | Type: Request.<br> Contains the index in `requestObject.index` and mapping in `requestObject.data.body` |
| `prepareDb:updateMappingProfiles` | Triggered on Kuzzle start to create the internal mapping for Profiles collection | Type: Request.<br> Contains the default mapping in `requestObject.data.body`                            |
| `prepareDb:updateMappingRoles`    | Triggered on Kuzzle start to create the internal mapping for Roles collection    | Type: Request.<br> Contains the default mapping in `requestObject.data.body`                            |
| `prepareDb:updateMappingUsers`    | Triggered on Kuzzle start to create the internal mapping for Users collection    | Type: Request.<br> Contains the default mapping in `requestObject.data.body`                            |


### > event: proxy

Events triggered when interacting with `proxy`.

| Event                | Description                                                                               | Input                                                                                                                                                                          |
|----------------------|-------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `proxy:broadcast`    | Triggered before broadcast. You can't modify the input on this event                      | Type: Object.<br> `{payload, channelsList}`<br> `payload` is the notification content. <br>`channelsList` is an array of channels to broadcast.                                |
| `proxy:joinChannel`  | Triggered after attaching a user to a room. You can't modify the input on this event      | Type: Object.<br> `{channel, id}`<br> `channel` is the channel name.<br> `id` is the connection id                                                                             |
| `proxy:leaveChannel` | Triggered before a room is removed for the user. You can't modify the input on this event | Type: Object.<br> `{channel, id}`<br> `channel` is the channel name.<br> `id` is the connection id                                                                             |
| `proxy:notify`       | Triggered before notifying a connection id                                                | Type: Object.<br> `{payload, channelsList, id}`<br> `payload` is the notification content. <br>`channelsList` is an array of channels to notify.<br> `id` is the connection id |


### > event: realtime

Events triggered when a request is sent to the [`realtime` controller](http://kuzzle.io/api-reference/#realtime-controller).

| Event                    | Description                                                            | Input         |
|--------------------------|------------------------------------------------------------------------|---------------|
|`realtime:after<Action>`  | All actions in `realtime` controller trigger an event after executing  | Type: Request |
|`realtime:before<Action>` | All actions in `realtime` controller trigger an event before executing | Type: Request |

### > event: room

Events triggered on subscription rooms activity.

| Event         | Description                                                                                    | Input                                                              |
|---------------|------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `room:new`    | Triggered when a new room is added in the rooms list. You can't modify the input on this event | Type: Object. <br> `{roomId, index, collection, formattedFilters}` |
| `room:remove` | Triggered after a room is removed from the list. You can't modify the input on this event      | Type: String.<br> The room id                                      |


### > event: security

Events triggered when a request is sent to the [`security` controller](http://kuzzle.io/api-reference/#security-controller).

| Event                                 | Description                                                                           | Input         |
|---------------------------------------|---------------------------------------------------------------------------------------|---------------|
| `security:after<Action>`              | All actions in `security` controller trigger an event after executing                 | Type: Request |
| `security:before<Action>`             | All actions in `security` controller trigger an event before executing                | Type: Request |
| `security:formatUserForSerialization` | Triggered before serializing a user. Useful to clean a user like attribute `password` | Type: User    |


### > event: server

Events triggered on server special events or when a request is sent to the [`server` controller](http://kuzzle.io/api-reference/#server-controller).

| Event                   | Description                                                          | Input                                                                 |
|-------------------------|----------------------------------------------------------------------|-----------------------------------------------------------------------|
| `server:after<Action>`  | All actions in `server` controller trigger an event after executing  | Type: Request                                                         |
| `server:before<Action>` | All actions in `server` controller trigger an event before executing | Type: Request                                                         |
