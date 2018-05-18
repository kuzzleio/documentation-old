---
layout: full.html.hbs
algolia: true
title: Common Attributes
order: 100
---

# Common Attributes

## HTTP

**URL:** `http://kuzzle:7512/<action route>[route options]`  
**Method:** `get|post|put|delete`  
**Body:** Can be empty for GET and DELETE methods or contains a JSON object for POST and PUT methods.

---

## Other Protocols

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

## Attributes Reference

### `mandatory` controller

The controller attribute specifies the type of action to perform.
The current implementation of Kuzzle embeds nine controllers:
`auth`, `bulk`, `collection`, `document`, `index`, `memoryStorage`, `realtime`, `security` and `server`.


### `mandatory` action

The action attribute tells Kuzzle which action to perform for the controller.

For instance, using the `document` controller, we can perform a `get` action or a `search` action.


### `optional` index

In Kuzzle, collections are linked to an index.
Any action on a document, a collection or an index will require the index attribute.

<aside class="notice">
  `mandatory` depending on the controller/action
</aside>


### `optional` collection

In Kuzzle, documents are linked to a collection.
Any action on a document or a collection will require the collection attribute.

<aside class="notice">
  `mandatory` depending on the controller/action
</aside>


### `mandatory` body

The `body` field contains the body of the resource sent to Kuzzle.

For instance, the `body` attribute might contain the content of a document we want to create.


### `optional` requestId

Kuzzle will create a unique request identifier if you don't provide one, but if you want to easily
identify which query generated a specific response, the best way is to provide your own request identifier in the request.
