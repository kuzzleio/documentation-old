---
layout: full.html
words:  1398
algolia: true
title: Request Life-Cycle
order: 0
---

# Request Life-Cycle

In this section we are going to focus on how Requests flow between Kuzzle components. We are going to analyze the life-cycle of a Request in order to understand in depth the Kuzzle Core architecture.

---

## Reading content from Kuzzle

By "reading", we mean any action involving getting content from the persistent layer: getting a single document, count documents, or search contents with advanced filters.

### HTTP Request

The schema below shows the [Architecture overview]({{ site_base_path }}guide/kuzzle-depth) showed above and highlights the components involved in reading actions:

![read_scenario_http_overview]({{ site_base_path }}assets/images/request-scenarios/read-http/overview.png)

The following diagram shows how the Request flows between the client application, the different Kuzzle components, and the external services:

![read_scenario_http_details]({{ site_base_path }}assets/images/request-scenarios/read-http/details.png)

* The HTTP client asks for a document via a HTTP GET Request. For instance, to retrieve the document '739c26bc-7a09-469a-803d-623c4045b0cb' in the collection `users`: `GET http://kuzzle:7512/mainindex/users/739c26bc-7a09-469a-803d-623c4045b0cb`.
* The proxy forwards the Request through the entry point to the HTTP Router, which handles it and forwards the formatted Request to the Funnel.

The formatted Request `input` looks like the following:

```javascript
{
  "controller": "document",
  "action": "get",
  "resource": {
    "index": "mainindex",
    "collection": "users",
    "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
  }
}
```

* The Funnel validates the data before sending the request to the Document Controller.
* The Document Controller calls the Storage Engine.
* The Storage Engine performs an HTTP request to get the data from the data storage.

The content returned by Elasticsearch looks like the following:

```javascript
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

* Promises functions are resolved to forward the response message back to the HTTP Router.
* The HTTP Router sends the response to the HTTP client.

### Websocket connection

The schema below shows the [Architecture overview]({{ site_base_path }}guide/kuzzle-depth) showed above and highlights the components involved in reading actions:

![read_scenario_websocket_overview]({{ site_base_path }}assets/images/request-scenarios/read-websocket/overview.png)

The following diagram shows how the Request flows between the client application, the different Kuzzle components, and the external services:

![read_scenario_websocket_details]({{ site_base_path }}assets/images/request-scenarios/read-websocket/details.png)

* The client application opens a Websocket connection to Kuzzle Proxy and sends message containing the request. For instance, to retrieve the document `739c26bc-7a09-469a-803d-623c4045b0cb` in the collection `users`:

```javascript
{
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "controller": "document",
  "action": "get",
  "collection": "users",
  "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
}
```

The client then listens to the `<requestId>` event on the socket, like the following:

```javascript
  this.socket.once("ed4faaff-253a-464f-a6b3-387af9d8483d", function(response) {
    callback(response);
  });
```

* The Proxy forwards the Request through the Proxy Entry Point to the Funnel.

The formatted Request `input` looks like the following:

```javascript
{
  "controller": "read",
  "action": "get",
  "resource": {
    "index": "mainindex",
    "collection": "users",
    "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
  }
}
```

* The Funnel validates the message and forward the request to the Document Controller.
* The Document Controller forwards the Request `input` to the Storage Engine.
* The Storage Engine performs an HTTP request to get the data from the data storage.

The content returned by Elasticsearch looks like the following:

```javascript
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

* Promises functions are resolved to forward the response message back to the Proxy Entry Point, who sends the response to the proxy.
* The Proxy triggers the callback, which emits a `<requestId>` event to the Websocket client.

---

## Subscribing and writing content to Kuzzle

This section explains what happens when clients send new content to Kuzzle.

Kuzzle is able to handle two different types of input:

* **persisted data**, via the [Document controller]({{ site_base_path }}api-documentation/controller-document).
* **real-time data**, via the [Realtime/Publish action]({{ site_base_path }}controller-realtime/publish).

### Writing persistent data

This subsection describes the process for **persistent** data, with an example using the "_create_" action (see also [API Documentation]({{ site_base_path }}api-documentation/controller-document/create)).

![persistence_overview]({{ site_base_path }}assets/images/request-scenarios/persistence/overview.png)

Detailed workflow:

![persistence_scenario_details]({{ site_base_path }}assets/images/request-scenarios/persistence/details.png)

* A client sends new content to Kuzzle, either via an HTTP request, through a Websocket connection or using a custom plugin protocol.
* The Proxy forwards the Request through the Proxy Entry Point to the Funnel.

The formatted Request `input` looks like the following:

```javascript
{
  "controller": "document",
  "action": "create",
  "resource": {
    "index": "mainindex",
    "collection": "users"
  },
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

* The Funnel forwards the Request to the Document Controller.
* The Document Controller sends the request to the Storage Engine service, who sends the request to the data storage.
* Once the Storage Engine gets the response back, it replies to the Document Controller.
* The Document Controller wraps the response in a Kuzzle Response and forwards it back to the user.

### Subscribe and Notification scenario

This subsection describes the life-cycle of real-time notifications about persistent and non persistent data, implementing the [Publish/Subscribe pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern).

Remember the [Architecture overview]({{ site_base_path }}guide/kuzzle-depth) and focus on the components involved by pub/sub actions:
![pubsub_overview]({{ site_base_path }}assets/images/request-scenarios/pubsub/overview.png)

#### 1st step: subscription

The following diagram shows how two different clients, a Websocket and a MQ one, subscribe to data.

![pubsub_scenario_details1]({{ site_base_path }}assets/images/request-scenarios/pubsub/details1.png)

* The client application opens a Websocket or a MQ connection and sends a subscription message with some filters (see the [API Documentation]({{ site_base_path }}api-documentation/controller-realtime/subscribe)). For instance, to be notified about any content posted to the collection `users`, containing a field `hobby` equals to `computer`:

```javascript
{
  "controller": "realtime",
  "action": "subscribe",
  "index": "mainindex",
  "collection": "users",
  "body": {
    "equals": {
      "hobby": "computer"
    }
  },
  "state": "all"
}
```

See the [Kuzzle DSL Reference]({{ site_base_path }}kuzzle-dsl/) for more details.

The client then listens to the `<requestId>` event on the socket.

* The proxy forwards the subscription message to the Funnel.

The formatted Request `input` looks like the following:

```javascript
{
  "controller": "realtime",
  "action": "subscribe",
  "resource": {
    "index": "mainindex",
    "collection": "users"
  },
  "body": {
    "equals": {
      "hobby": "computer"
    }
  },
  "state": "all"
}
```

* The Funnel validates the request and forwards it to the Realtime Controller.
* The Realtime Controller calls the HotelClerk internal component to create the subscription.
* The HotelClerk calls the DSL component to normalize the filters and register the subscription (see [DSL Readme](https://github.com/kuzzleio/kuzzle/blob/master/lib/api/dsl/README.md) for more details).
* Promises functions are resolved to forward the channel ID from the HotelClerk to the Proxy
* The Proxy triggers the callback, which emits a `<requestId>` event containing the subscribed channel ID to the Websocket client.

Sample response content:

```javascript
{
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "status": 200,
  "error": null,
  "controller": "realtime",
  "action": "subscribe",
  "index": "mainindex",
  "collection": "users",
  "result": {
    "roomId": "78c5b0ba-fead-4535-945c-8d64a7927459",
    "channel": "c5cd8bdc-06a4-4d6e-bae3-61f1a8ac2982"
  }
}
```

* The client now listens to events from this `channel`, to be notified about new messages corresponding to the subscription filters.


#### 2nd step : notify about real-time actions

The following diagram shows how Kuzzle handles a new message and how subscribed clients are notified:

![pubsub_scenario_details2]({{ site_base_path }}assets/images/request-scenarios/pubsub/details2.png)

* A new content is published to the Notifier component. The `_publish_` method can be triggered:
  * either directly by the Realtime controller for non persistent data (using the [publish]({{ site_base_path }}api-documentation/controller-realtime/publish) action).
  * or by the write actions of the Document controllers, to notify users in real-time before the data are sent to the storage Engine.
  (see [Notifications Documentation]({{ site_base_path }}api-documentation/notifications) for more details)
* The Notifier calls the DSL component to test registered filters that match the content, and get related rooms.
* The Notifier uses the Notification Cache engine to store the mapping content/rooms into cache.
* The Notifier calls the HotelClerk to get the channels related to the rooms.
* The Notifier broadcasts the message to each related channel to the proxy.
* Finally, the proxy sends the message to the clients who subscribed to it.

#### 3rd step : notify about persisted data

The following diagram show how subscribed clients are notified after a document has been persisted (created, updated or deleted) to the storage engine:

![pubsub_scenario_details3]({{ site_base_path }}assets/images/request-scenarios/pubsub/details3.png)

* Once the document is actually persisted, the Notifier component is notified about it by the Document Controller
* The Notifier calls the Notification Cache to get the rooms related to the content
* The Notifier calls the HotelClerk to get the channels related to the rooms
* The Notifier asks the proxy to broadcast the notification to all users having subscribed to the retrieved channels, on all registered network protocols
