## Request Scenarios

These following scenarios explain the message flow between Kuzzle components.

### Reading content from Kuzzle

By "reading", we mean any action involving getting content from the persistent layer: getting a single document, count documents, or search contents with advanced filters.

#### HTTP Request

Remember the [Architecture overview](#core-architecture) and focus on the components involved by reading actions:
![read_scenario_http_overview](./images/request-scenarios/read-http/overview.png)

The following diagram shows how request data is exchanged between the client application, the different Kuzzle components, and the external services:

![read_scenario_http_details](./images/request-scenarios/read-http/details.png)

\#1. The HTTP client asks for a content using a HTTP GET Request

For instance, to retrieve the document '739c26bc-7a09-469a-803d-623c4045b0cb' in the collection 'users':
```
GET http://kuzzle:7511/api/users/739c26bc-7a09-469a-803d-623c4045b0cb
```

\#2. The proxy forwards the input request throughs the ```HTTP Entry point``` to the ```Router```, who handles it and forwards the formatted message to the ```Funnel```.

Sample message:

```json
{
  "index": "mainindex",
  "collection": "users",
  "controller": "read",
  "action": "get",
  "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
}
```

\#3. The ```Funnel Controller``` validates the data before sending the request to the ```Document Controller```

\#4. The ```Document Controller``` calls the ```readEngine service```

\#5. The ```readEngine service``` performs an HTTP request to get the data from the data storage

Sample content retrieval from Elasticsearch:

```json
{
  "_index": "mainindex",
  "_type": "users",
  "_id": "739c26bc-7a09-469a-803d-623c4045b0cb",
  "_version": 1,
  "found": true,
  "_source": {
      "firstName": "Grace",
      "lastName": "Hopper",
      "age": 85,
      "location": {
          "lat": 32.692742,
          "lon": -97.114127
      },
      "city": "NYC",
      "hobby": "computer"
  }
}
```

\#6. Promises functions are resolved to forward the response message back to the HTTP Router

Sample content resolved:

```json
{
  "data": {
    "_index": "mainindex",
    "_type": "users",
    "_id": "739c26bc-7a09-469a-803d-623c4045b0cb",
    "_version": 1,
    "found": true,
    "_source": {
        "firstName": "Grace",
        "lastName": "Hopper",
        "age": 85,
        "location": {
            "lat": 32.692742,
            "lon": -97.114127
        },
        "city": "NYC",
        "hobby": "computer"
    }
  }
}
```
\#7. The HTTP Router sends the response to the HTTP client.

Sample response content:

```json
{
  "status": 200,
  "error": null,
  "result": {
    "_index": "mainindex",
    "_type": "users",
    "_id": "739c26bc-7a09-469a-803d-623c4045b0cb",
    "_version": 1,
    "found": true,
    "_source": {
        "firstName": "Grace",
        "lastName": "Hopper",
        "age": 85,
        "location": {
            "lat": 32.692742,
            "lon": -97.114127
        },
        "city": "NYC",
        "hobby": "computer"
    }
  }
}
```

#### Websocket connection

Remember the [Architecture overview](#core-architecture) and focus on the components involved by reading actions:
![read_scenario_websocket_overview](./images/request-scenarios/read-websocket/overview.png)

The following diagram shows how request data is exchanged between the client application, the different Kuzzle components, and the external services:

![read_scenario_websocket_details](./images/request-scenarios/read-websocket/details.png)

\#1. The client application opens a Websocket connection to ```Kuzzle Proxy``` and emit a "read" event containing the request

(see details in [API Documentation](http://kuzzleio.github.io/kuzzle-api-documentation/#socket-io))

For instance, to retrieve the document ```739c26bc-7a09-469a-803d-623c4045b0cb``` in the collection ```users```:

```json
{
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "action": "get",
  "collection": "users",
  "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
}
```

The client then listens to the ```<requestId>``` event on the socket. The result of his request will be sent using this event.

Sample JS code :
```javascript
  this.socket.once("ed4faaff-253a-464f-a6b3-387af9d8483d", function(response) {
    callback(response);
  });
```

\#2. The SocketIO plugin handles the input request and forwards the message to the ```Backend Broker```

\#3. The Backend Broker, sends the message to the server's ```Proxy Broker``` through an internal websocket connexion.

\#4. The Proxy Broker forwards the input request throughs the ```Proxy Entry point``` to the ```Router```, who handles it and forwards the formatted message to the ```Funnel```.

Sample message:

```json
{
  "controller": "document",
  "collection": "users",
  "action": "get",
  "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
}
```

\#5. The ```Funnel``` validates the message and forward the request to the ```Document Controller```

\#6. The ```Document Controller``` calls the ```readEngine service```

\#7. The ```readEngine service``` performs an HTTP request to get the data from the data storage

Sample content retrieval from Elasticsearch:

```json
{
  "_index": "mainindex",
  "_type": "users",
  "_id": "739c26bc-7a09-469a-803d-623c4045b0cb",
  "_version": 1,
  "found": true,
  "_source": {
      "firstName": "Grace",
      "lastName": "Hopper",
      "age": 85,
      "location": {
          "lat": 32.692742,
          "lon": -97.114127
      },
      "city": "NYC",
      "hobby": "computer"
  }
}
```

\#8. Promises functions are resolved to forward the response message back to the Proxy Broker.

Sample content resolved:

```json
{
  "data": {
    "_index": "mainindex",
    "_type": "users",
    "_id": "739c26bc-7a09-469a-803d-623c4045b0cb",
    "_version": 1,
    "found": true,
    "_source": {
        "firstName": "Grace",
        "lastName": "Hopper",
        "age": 85,
        "location": {
            "lat": 32.692742,
            "lon": -97.114127
        },
        "city": "NYC",
        "hobby": "computer"
    }
  }
}
```

\#9. The Proxy Broker sends the response to the proxy's ```Backend Broker``` through the websocket connexion.

\#10. The Proxy calls the plugin's callback, who emits a ```<requestId>``` event to the websocket client

Sample response content:

```json
{
  "status": 200,
  "error": null,
  "result": {
    "_index": "mainindex",
    "_type": "users",
    "_id": "739c26bc-7a09-469a-803d-623c4045b0cb",
    "_version": 1,
    "found": true,
    "_source": {
        "firstName": "Grace",
        "lastName": "Hopper",
        "age": 85,
        "location": {
            "lat": 32.692742,
            "lon": -97.114127
        },
        "city": "NYC",
        "hobby": "computer"
    }
  }
}
```


### Subscribing and writing content to Kuzzle

This section explains what happens when clients send new content to Kuzzle

Kuzzle is able to manage two different types of data:
* persistent data => using the "_create_", "_createOrUpdate_", or "_delete_" actions.
* volatile/realtime data => using the "_publish_" action.

Kuzzle handles data differently, depending if it's persistent or not.

#### Writing persistent data

This subsection describes the process for **persistent** data, with an example using the "_create_" action.
(see also [API Documentation](http://kuzzle.io/api-reference/#create))

![persistence_overview](./images/request-scenarios/persistence/overview.png)

Detailed workflow:

![persistence_scenario_details](./images/request-scenarios/persistence/details.png)

\#1. A client sends new content to Kuzzle, either with an HTTP request, through a websocket connection or using a custom plugin protocol (see [Reading scenarios](#reading-content-from-kuzzle))

\#2. The router handles the input request and forward the message to the ```Funnel```

```json
{
  "index": "mainindex",
  "collection": "users",
  "controller": "document",
  "action": "create",
  "body": {
      "firstName": "Grace",
      "lastName": "Hopper",
      "age": 85,
      "location": {
        "lat": 32.692742,
        "lon": -97.114127
      },
      "city": "NYC",
      "hobby": "computer"
  }
}
```

\#3. The ```Funnel``` validates the message and triggers the ```Plugins Manager``` with a "document:create" event.<br/>
The ```Plugins Manager``` calls all pipes and hooks configured by the active plugins (see [Plugin's documentation](#plugins)).
 
\#4. The ```Funnel``` forwards the request to the ```Document Controller```

\#5. The ```Document Controller``` sends the request to the ```Storage Engine``` service.

The `Storage Engine` sends the request to the database.

\#6. Once the `Storage Engine` gets the response back, it replies to the `Document Controller`

\#7. The `Document Controller` wraps the response in a Kuzzle Response and forwards it back to the user.

#### Subscribe and Notification scenario

This subsection describes the process for **non persistent** data, as well as real-time notification about persisted data, using the [Publish/Subscribe pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern).

Remember the [Architecture overview](#core-architecture) and focus on the components involved by pub/sub actions:
![pubsub_overview](./images/request-scenarios/pubsub/overview.png)

##### 1st step : subscription

The following diagram shows how two different clients, a Websocket and a MQ one, subscribe to data.

![pubsub_scenario_details1](./images/request-scenarios/pubsub/details1.png)

\#1. The client application opens a Websocket or a MQ connection and emits a "subscribe" event with some filters.
(see [API Documentation](http://kuzzle.io/api-reference/#on))

For instance, to be notified about all contents posted to the collection "users", containing a field "hobby" equals to "computer":
```json
{
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "index": "mainindex",
  "collection": "users",
  "action": "on",
  "body": {
    "equals": {"hobby": "computer" }
  },
  "state": "all"
}
```

(see [Filtering Syntax](#filtering-syntax) for more details about filters)


The client then listens to the ```<requestId>``` event on the socket.
Kuzzle will get back to him with a corresponding Room ID and a Room Channel using this event.

Sample Javascript code, using Websocket:

```javascript
  this.socket.once("ed4faaff-253a-464f-a6b3-387af9d8483d", function(response) {
    callback(response);
  });
```


\#2. The ```Router``` interprets the input request and transfer the subscription message to the ```Funnel```.

Sample message:
```json
{
  "index": "mainindex",
  "collection": "users",
  "controller": "subscribe",
  "action": "on",
  "filter": {
    "equals": {"hobby": "computer" }
  }
}
```

\#3. The ```Funnel``` validates the message and transfers it to the ```Realtime Controller```.

\#4. The ```Realtime Controller``` calls the ```HotelClerk``` internal component to create the subscription.

\#5. The ```HotelClerk``` calls the ```DSL``` component to get a formated filter related to the subscription (see [DSL Readme](https://github.com/kuzzleio/kuzzle/blob/master/lib/api/dsl/README.md) for more details).

\#6. The ```HotelClerk``` creates a channel related to the filters and gives it back to the ```Realtime Controller```.

\#7. The channel is sent back to the Websocket (or MQ) Router through the internal components.

\#8. The Websocket (or MQ) Router emits a ```<requestId>``` event to the client, containing the subscribed channel ID.

Sample response content:

```json
{
  "status": 200,
  "error": null,
  "index": "mainindex",
  "collection": "users",
  "controller": "subscribe",
  "action": "on",
  "state": "all",
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "result": {
    "roomId": "78c5b0ba-fead-4535-945c-8d64a7927459",
    "channel": "c5cd8bdc-06a4-4d6e-bae3-61f1a8ac2982"
  }
}
```

\#9. The client now listens to this ```channel``` events to be notified about new messages corresponding to his subscription filters.

##### 2nd step : notify about real-time actions

The following diagram shows how Kuzzle handles a new message and how subscribed clients are notified:

![pubsub_scenario_details2](./images/request-scenarios/pubsub/details2.png)

\#1. A new content is published to the ```Notifier``` component.

The "_publish_" method can be triggered:
* either direclty by the ```Document Controller``` for non persistent data (using the [publish](http://kuzzle.io/api-reference/#publish) action).
* or by the ```Plugins Manager``` when a 'document:create' event is triggered, to notify users in real-time before the data are sent to the storage Engine.

\#2. The ```Notifier``` calls the ```DSL``` component to test registered filters that match the content, and get related rooms.

\#3. The ```Notifier``` uses the ```Notification Cache``` engine to store the mapping content/rooms into cache.

\#4. The ```Notifier``` calls the ```HotelClerk``` to get the channels related to the rooms.

\#5. The ```Notifier``` broadcasts the message to each related channel to the Websocket and MQ plugins.

\#6. Finally, the plugins send the message to the clients who subscribed to it.


##### 3rd step : notify about persisted data

![pubsub_scenario_details2](./images/request-scenarios/pubsub/details3.png)

\#1. The ```Notifier``` component is notified about a new action by the ```Document Controller``` (see [step \#11. in write scenario](#writing-persistent-data)).

\#2. The ```Notifier``` calls the ```Notification Cache``` to get the rooms related to the content.

\#3. The ```Notifier``` calls the ```HotelClerk``` to get the channels related to the rooms.

\#4. The ```Notifier``` broadcasts the message to each related channel to the Websocket and MQ plugins.

\#5. Finally, the plugins send the message to the clients who subscribed to it.
