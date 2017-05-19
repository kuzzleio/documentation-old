---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createOrReplace
---

# createOrReplace


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/<documentId>[?refresh=wait_for]`  
**Method:** `PUT`  
**Body:**
</p>
</blockquote>


```js
{
  // The document to update
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
  "action": "createOrReplace",
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
  "action": "createOrReplace",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",
    "_source": { // The created document
      ...
    },
    "_version": "<number>",// The new version number of this document
    "created": "<boolean>" // true: a new document has been created, false: the document has been updated
  }
}
```

Creates a new document in the persistent data storage, or replaces it if it already exists.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document indexation (indexed documents are available for `search`).
