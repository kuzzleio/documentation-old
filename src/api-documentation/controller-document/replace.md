---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: replace
---

# replace

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/<index>/<collection>/<documentId>/_replace[?refresh=wait_for]`  
</br><b>Method:</b> `PUT`  
**Body:**
</p>
</blockquote>


```js
{
  // New document content
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
  "action": "replace",
  "refresh": "wait_for",
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
  "action": "replace",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",
    "_source": { // The resulting document
      ...
    },
    "_meta": {
      ...
    },
    "_version": "<number>",// The new version number of this document
    "created": false
  }
}
```

Replaces an existing document in the persistent data storage.
Only documents in the persistent data storage layer can be replaced.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document to be indexed (indexed documents are available for `search`).
