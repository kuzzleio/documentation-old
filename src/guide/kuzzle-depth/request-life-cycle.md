---
layout: full.html
algolia: true
title: Request Life-Cycle
order: 0
---

# Request Life-Cycle

In this section we are going to focus on how requests are processed by Kuzzle Backend. We are going to analyze the life-cycle of a request in order to review Kuzzle Backend's internal architecture. 

Kuzzle Backend has two main modes of communication:

* **Synchronous**: Clients send requests to Kuzzle Backend, which processes the data using the [Document Controller]({{ site_base_path }}api-documentation/controller-document) and then sends a response back to the Client.

* **Asynchronous**: Clients subscribe to Kuzzle Backend via the [Real-time/Subscribe]({{ site_base_path }}api-documentation/controller-realtime/publish) API action and receive data asynchronously as a result of a [Real-time/Publish]({{ site_base_path }}api-documentation/controller-realtime/publish) API action or a [Document Controller]({{ site_base_path }}api-documentation/controller-document) event.

These modes of communication are generally independant from the transport protocol. For example, a synchronous request can be made via HTTP or Websockets.

---

## Synchronous Communication 


In a synchronous request, Kuzzle Backend will receive a request, process it, and return the result in a response over the same channel. All this is done sequentially.

Currently all forms of synchronous communication pass through the Document Controller and involve some operation on persistent data: a synchronous request will generally be used to read, create, update, or delete a document. 

Depending on the transport protocol used to communicate with Kuzzle Backend, different components of the architecture will be used; however, in all cases the data will flow through the Document Controller to and from the storage layer. To demonstrate, we will describe how a "read" request is performed, using two different protocols: HTTP and Websocket. The process is similar for a synchronous update or write.

### Synchronous Request using HTTP Protocol

In the diagram below, we highlighted the components of Kuzzle Backend's [Architecture]({{ site_base_path }}guide/kuzzle-depth) that are used in a read request using HTTP:

![read_scenario_http_overview]({{ site_base_path }}assets/images/request-scenarios/read-http/overview.png)

The following diagram shows how a request flows between the client application, the different Kuzzle Backend components, and the external services:

![read_scenario_http_details]({{ site_base_path }}assets/images/request-scenarios/read-http/details.png)

* The HTTP Client will request a document by making an HTTP GET request. For instance, to retrieve a document with `_id` equal to `739c26bc-7a09-469a-803d-623c4045b0cb` in the `users` collection, the Client will perform the following request: `GET http://kuzzlebackend:7512/myindex/users/739c26bc-7a09-469a-803d-623c4045b0cb`.

* The HTTP router receives the message and creates a [Request Input](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestinput) object that it forwards to the Funnel. The `Request Input` will look like this:
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

* The Funnel then validates the formatted data and sends it to the Document Controller.

* The Document Controller then requests the document from the Storage Engine.

* The Storage Engine retrieves the data from the document store (Elasticsearch) and returns a document to the Document Controller which looks like this:
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

* The document will make its way through the chain of components until it is received by the Client.

### Synchronous Request using Websocket Protocol

In the diagram below, we highlighted the components of Kuzzle Backend's [Architecture]({{ site_base_path }}guide/kuzzle-depth) that are used in a read request using Websockets:

![read_scenario_websocket_overview]({{ site_base_path }}assets/images/request-scenarios/read-websocket/overview.png)

The following diagram shows how a request flows between the client application, the different Kuzzle Backend components, and the external services:

![read_scenario_websocket_details]({{ site_base_path }}assets/images/request-scenarios/read-websocket/details.png)

* The Client opens a websocket connection to Kuzzle Backend and sends a request message. For example, to retrieve a document with `_id` equal to `739c26bc-7a09-469a-803d-623c4045b0cb` in the `users` collection, the Client will send the following message:
```javascript
{
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "index": "myindex",
  "controller": "document",
  "action": "get",
  "collection": "users",
  "_id": "739c26bc-7a09-469a-803d-623c4045b0cb"
}
```

* The Client then listens to the `<requestId>` event on the socket. For example:
```javascript
  this.socket.once("ed4faaff-253a-464f-a6b3-387af9d8483d", function(response) {
    callback(response);
  });
```

* The Kuzzle Backend receives the message and the protocol entrypoint creates a [Request Input](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestinput) object which it passes to the Funnel. The `Request Input` looks like this: 
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

* The Funnel then validates the formatted data and sends it to the Document Controller.

* The Document Controller then requests the document from the Storage Engine.

* The Storage Engine retrieves the data from the document store (Elasticsearch) and returns a document to the Document Controller which looks like this:
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

* The document will make its way back through the chain of components back to the entry point.

* The entry point emits the `<requestId>` event and the Client receives the response.

---


## Asynchronous Communication 

In an asynchronous request, Kuzzle Backend will receive a request over one channel, process it, and trigger a response over another channel. In order to receive the response, the Client must subscribe to the trigger. Because two separate channels are used, the request and response do not need to be made by the same Client nor do they need to be made sequentially.

This form of communication is generally referred to as publish/subscribe, because on the one side a Client is **subscribing** to a channel and on the other side a Client is **publishing** to a channel.

This subsection describes the life-cycle of real-time notifications which implement the [Publish/Subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern.

In the diagram below, we highlighted the components of Kuzzle Backend's [Architecture]({{ site_base_path }}guide/kuzzle-depth) that are used in the publish/subscribe pattern:
![pubsub_overview]({{ site_base_path }}assets/images/request-scenarios/pubsub/overview.png)

#### Subscribing to a Channel

The following diagram shows how a client can subscribe to a channel.

![pubsub_scenario_details1]({{ site_base_path }}assets/images/request-scenarios/pubsub/details1.png)

* The client application opens a websocket (or MQ) connection, sends a subscription request (see the [API Documentation]({{ site_base_path }}api-documentation/controller-realtime/subscribe)), and then listens for the `<requestId>` event on the socket. The subscription request is a message that contains a filter description which tells Kuzzle Backend what events should trigger a response. For instance, this message would trigger a response whenever content is posted to the `users` collection that contains the field `hobby` with value `computer` (see the [Koncorde Reference]({{ site_base_path }}kuzzle-dsl/) for more details):
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

* Kuzzle Backend receives the message and the protocol entrypoint creates a [Request Input](https://github.com/kuzzleio/kuzzle-common-objects/blob/master/README.md#modelsrequestinput) object. The `Request Input` is passed to the Funnel, with the following format:
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

* The Funnel validates the request and forwards it to the Real-time Controller.

* The Real-time Controller registers the subscription with the HotelClerk, an internal component that acts as a lookup table of subscribers.

* The HotelClerk calls Koncorde to normalize the filters and register the subscription (see [Koncorde](https://github.com/kuzzleio/koncorde) for more details). It then sends a response which includes the `channel` ID back to the entrypoint.

* The entrypoint then returns a response to the Client, which includes a `<requestId>` and the `channel` ID, and looks like this:
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

* The Client can now subscribe to the `channel` and listen to events in order to be notified any time a message is processed that matches the subscription filters.


#### Publishing to a Channel Directly

The following diagram shows how Kuzzle Backend triggers a response as a result of a publish request made using the [Real-time/Publish]({{ site_base_path }}api-documentation/controller-realtime/publish) action)

![pubsub_scenario_details2]({{ site_base_path }}assets/images/request-scenarios/pubsub/details2.png)

* The Real-time Controller receives the **publish** request from a Client and sends it to the Notifier component.
* The Notifier Component calls Koncorde to check if the content matches any filters.
* The Notifier Component uses the Notification Cache Engine to store the mapping rules into cache.
* The Notifier Component calls the HotelClerk to get the channels related to the filters.
* The Notifier Component broadcasts the message for each channel that is linked to the filter.
* Finally, the entrypoint emits the message to the Clients that are **subscribed** to it.

#### Publishing to a Channel Indirectly

The following diagram shows how Kuzzle Backend uses the Document Controller to trigger a notification as a result of a change to persistent data.

![pubsub_scenario_details3]({{ site_base_path }}assets/images/request-scenarios/pubsub/details3.png)

* A Client makes a synchronous "create" request, which goes through the Kuzzle Backend components to the Document Controller.
* The Document Controllers sends the data to the Storage Engine.
* Once the document is stored, the Document Controller calls the Notifier Component.
* The Notifier Component then calls the Notification Cache to check if the content matches any filters.
* The Notifier Component calls the HotelClerk to get the channels related to the filters.
* The Notifier Component asks the entrypoint to broadcast the notification to all Clients that are subscribed to the channels.
