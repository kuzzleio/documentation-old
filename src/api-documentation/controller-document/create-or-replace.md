---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createOrReplace
---

# createOrReplace

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/<documentId>[?refresh=wait_for]`  
**Method:** `PUT`  
**Body:**
</p>
</blockquote>


```js
{
  // Document content
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
    "_version": <number>, // The new version number of this document
    "created": <boolean>  // If false, a previously existing document has been replaced
  }
}
```

Creates a new document in the persistent data storage, or replace it if it already exists.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document to be indexed (indexed documents are available for `search`).
