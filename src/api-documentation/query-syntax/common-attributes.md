---
layout: full.html
algolia: true
title: Common attributes
order: 100
---

# Common attributes

## HTTP

**URL:** `http://kuzzle:7512/<action route>[route options]`  
**Method:** `get|post|put|delete`  
**Body:** Can be empty (usually with get and delete methods) or a JSON object of the resource body (usually with post and put methods).

---

## Other protocols

### Websocket

The Websocket layer listens to a specific socket room in order to forward your queries to the right Kuzzle controller.

**Room name:** `kuzzle`  
**Query body syntax:** `JSON object`

### MQTT

The MQTT layer listens to a specific topic in order to forward your queries to the right Kuzzle controller.  

**Topic name:** `kuzzle`  
**Query body syntax:** `JSON object`

### Query exemple

```javascript
{
  // Optional: Unique request Identifier
  "requestId": "<unique request identifier>",

  // Required: Controller and Action to call:
  "controller": "<controller>",
  "action": "<action>",

  // Index on which the action is handled (empty for actions that do not manage a unique index)
  "index": "<index>",

  // Collection on which the action is handled (empty for actions that do not manage a unique collection)
  "collection": "<collection>",

  // A set of filters matching documents you want to listen to
  "body": {..}
}
```

---

## Attributes reference

### `mandatory` controller

The controller attribute specifies the type of action to perform.
The current implementation of Kuzzle embeds nine controllers:
`auth`, `bulk`, `collection`, `document`, `index`, `memoryStorage`, `realtime`, `security` and `server`.


### `mandatory` action

The action attribute indicates to Kuzzle which action to perform for the controller.

For instance, using the `document` controller, we can perform a `get` action or a `search`.


### `optional` index

Kuzzle attaches its collections to a index.
Any action impacting a document, a collection or an index itself will need this attribute fed.

<aside class="notice">
  `mandatory` depending on the controller/action
</aside>


### `optional` collection

Kuzzle attaches its documents to a collection.
Any action impacting a document or a collection itself will need this attribute fed.

<aside class="notice">
  `mandatory` depending on the controller/action
</aside>


### `mandatory` body

The `body` field contains the body of the resource sent to Kuzzle.

For instance, the `body` attribute will contain the filters on which to listen
to during a real-time subscription or the content of the document to create/publish.


### `optional` requestId

Kuzzle will create a unique ID if you don't provide one, but if you want to easily
identify which query generated the response you got, the best way is to provide it yourself in the request.
