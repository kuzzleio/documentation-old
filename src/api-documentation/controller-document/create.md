---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: create
---

# create


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_create[?refresh=wait_for]` or `http://kuzzle:7512/<index>/<collection>/<documentId>/_create[?refresh=wait_for]`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // The message to send
}
```


<blockquote class="json">
<p>
**Query:**
</p>
</blockquote>


```json
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "create",
  "refresh": "wait_for",
  "_id": "<documentId>",            
  "body": {}
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "create",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",  // The generated or provided document id
    "_version": 1 // The version of the document in the persistent data storage
    "_source": { // The created document
      ...
    },
  }
}
```

Creates a new document in the persistent data storage.

Returns an error if the document already exists.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document indexation (indexed documents are available for `search`).
