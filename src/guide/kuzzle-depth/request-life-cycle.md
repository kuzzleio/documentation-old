---
layout: full.html
algolia: true
title: Request Life-Cycle
order: 0
---

# Request Life-Cycle

In this section we are going to focus on how Requests are processed by Kuzzle Backend. We are going to analyze the life-cycle of a Request in order to understand the Kuzzle Backend architecture.

---

## Reading Content 

By "reading", we mean any action that involves getting content from the persistent layer: such as fetching a single document, counting documents, or searching documents using advanced filters.

### HTTP Request

The diagram below shows Kuzzle Backend's [Architecture]({{ site_base_path }}guide/kuzzle-depth), components involved in a read request are highlighted:

![read_scenario_http_overview]({{ site_base_path }}assets/images/request-scenarios/read-http/overview.png)

The following diagram shows how a Request flows between the client application, the different Kuzzle Backend components, and the external services:

![read_scenario_http_details]({{ site_base_path }}assets/images/request-scenarios/read-http/details.png)

* The HTTP Client asks for a document via an HTTP GET Request. For instance, to retrieve the document '739c26bc-7a09-469a-803d-623c4045b0cb' in the `users` collection: `GET http://kuzzlebackend:7512/myindex/users/739c26bc-7a09-469a-803d-623c4045b0cb`.
* The proxy forwards the Request through the Proxy Entry Point to the HTTP Router, which formats the document and forwards it to the Funnel. The formatted Request `input` looks like this:
```javascript
{
  "controller": "document",
  "action": "get",
  "resource": {
    "index": "myindex",
    "collection": "users",
    "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
  }
}
```

* The Funnel validates the data before sending the request to the Document Controller.

* The Document Controller calls the Storage Engine.

* The Storage Engine performs an HTTP request to get the data from the data storage. The content returned by Elasticsearch looks like this:
```javascript
{
  "_index": "myindex",
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

* The Storage Engine response is passed back through each component to reach the HTTP Client.

### Websocket Connection

The diagram below shows Kuzzle Backend's [Architecture]({{ site_base_path }}guide/kuzzle-depth), components involved in a read request are highlighted:

![read_scenario_websocket_overview]({{ site_base_path }}assets/images/request-scenarios/read-websocket/overview.png)

The following diagram shows how a Request flows between the client application, the different Kuzzle Backend components, and the external services:

![read_scenario_websocket_details]({{ site_base_path }}assets/images/request-scenarios/read-websocket/details.png)

* The client application opens a websocket connection to Kuzzle Backend's Proxy component and sends a request message. For instance, to retrieve the document with `_id=739c26bc-7a09-469a-803d-623c4045b0cb` in the `users` collection the message would look like this:
```javascript
{
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "controller": "document",
  "action": "get",
  "collection": "users",
  "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
}
```

* The client then listens to the `<requestId>` event on the socket, as follows:
```javascript
  this.socket.once("ed4faaff-253a-464f-a6b3-387af9d8483d", function(response) {
    callback(response);
  });
```

* The Proxy forwards the Request through the Proxy Entry Point to the Funnel. The formatted `input` Request looks like this:
```javascript
{
  "controller": "read",
  "action": "get",
  "resource": {
    "index": "myindex",
    "collection": "users",
    "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
  }
}
```

* The Funnel validates the data before sending the request to the Document Controller.

* The Document Controller calls the Storage Engine.

* The Storage Engine performs an HTTP request to get the data from the data storage. The content returned by Elasticsearch looks like this:
```javascript
{
  "_index": "myindex",
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

* The Storage Engine response is passed back through each component to reach the Proxy.

* The Proxy triggers the callback, which emits a `<requestId>` event to the websocket client.

---

## Subscribing and Writing Content

This section explains what happens when clients send new content to Kuzzle Backend.

Kuzzle Backend is able to handle two different input types:

* **persisted data**, via the [Document controller]({{ site_base_path }}api-documentation/controller-document).
* **real-time data**, via the [Realtime/Publish action]({{ site_base_path }}controller-realtime/publish).

### Writing Persistent Data

This subsection describes the process for writing **persistent** data, using the "_create_" action (see also [API Documentation]({{ site_base_path }}api-documentation/controller-document/create)).

![persistence_overview]({{ site_base_path }}assets/images/request-scenarios/persistence/overview.png)

The following diagram shows how a Request flows between the client application, the different Kuzzle Backend components, and the external services:

![persistence_scenario_details]({{ site_base_path }}assets/images/request-scenarios/persistence/details.png)

* A client sends content to Kuzzle Backend, either via an HTTP request, via a websocket connection or via a custom protocol.

* The Proxy forwards the Request through the Proxy Entry Point to the Funnel. The formatted `input` Request looks like this:
```javascript
{
  "controller": "document",
  "action": "create",
  "resource": {
    "index": "myindex",
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

* The Document Controller sends the request to the Storage Engine, who sends the request to the Storage Service.

* Once the Storage Engine gets the response back, it replies to the Document Controller.

* The Document Controller wraps the response and forwards it back to the user.

### Subscription and Notification

This subsection describes the life-cycle of real-time notifications which implement the [Publish/Subscribe pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern).

The diagram below shows Kuzzle Backend's [Architecture]({{ site_base_path }}guide/kuzzle-depth), components involved in a pub/sub pattern are highlighted::
![pubsub_overview]({{ site_base_path }}assets/images/request-scenarios/pubsub/overview.png)

#### 1st step: Subscription

The following diagram shows how a client can subscribe to data.

![pubsub_scenario_details1]({{ site_base_path }}assets/images/request-scenarios/pubsub/details1.png)

* The client application opens a websocket (or a MQ connection), sends a subscription message with some filters (see the [API Documentation]({{ site_base_path }}api-documentation/controller-realtime/subscribe)), and listens for the `<requestId>` event on the socket. For instance, this message would subscribe to content posted to the `users` collection that contains a field `hobby` equal to `computer` (see the [Kuzzle DSL Reference]({{ site_base_path }}kuzzle-dsl/) for more details):
```javascript
{
  "controller": "realtime",
  "action": "subscribe",
  "index": "myindex",
  "collection": "users",
  "body": {
    "equals": {
      "hobby": "computer"
    }
  },
  "state": "all"
}
```

* The Proxy forwards the subscription message to the Funnel. The formatted `input` Request looks like this:
```javascript
{
  "controller": "realtime",
  "action": "subscribe",
  "resource": {
    "index": "myindex",
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

* The response from the HotelClerk, that includes the channel ID, is passed through the components to the Proxy

* The Proxy triggers the callback, which emits a `<requestId>` event containing the subscribed channel ID to the websocket client. Sample response content:
```javascript
{
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "status": 200,
  "error": null,
  "controller": "realtime",
  "action": "subscribe",
  "index": "myindex",
  "collection": "users",
  "result": {
    "roomId": "78c5b0ba-fead-4535-945c-8d64a7927459",
    "channel": "c5cd8bdc-06a4-4d6e-bae3-61f1a8ac2982"
  }
}
```

* The client now listens to events from the `channel`, and will be notified any time a message is processed that matches the subscription filters.


#### 2nd step : Notification

The following diagram shows how Kuzzle Backend handles a new message and how subscribed clients are notified:

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
