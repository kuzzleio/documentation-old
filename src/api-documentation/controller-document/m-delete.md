---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mDelete
---

# mDelete


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_mDelete[?refresh=wait_for]`  
**Method:** `DELETE`  
**Body:**
</p>
</blockquote>


```js
{
  "ids": ["<documentId>", "<anotherDocumentId>", ...]
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
  "action": "mDelete",
  "body": {
    "ids": ["<documentId>", "<anotherDocumentId>"]
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "action": "mDelete",
  ["refresh": "wait_for",]
  "controller": "document",
  "requestId": "<unique request identifier>",
  "result": [
    "<documentId>",
    "<anotherDocumentId>",
    ...
  ]
}
```

Deletes documents in the persistent data storage.

Returns a [partial error]({{ site_base_path }}api-documentation/errors/#partialerror) (with status 206) if one or more document can not be deleted.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document indexation (indexed documents are available for `search`).
