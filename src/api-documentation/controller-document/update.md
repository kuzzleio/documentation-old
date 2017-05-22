---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: update
---

# update


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/<documentId>/_update[?refresh=wait_for][&retryOnConflict=<retries>]`  
**Method:** `PUT`  
**Body:**
</p>
</blockquote>


```js
{
  "field_to_update1": "new value",
  "field_to_update2": "new value",
  ...
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
  "action": "update",
  "refresh": "wait_for",
  "retryOnConflict": "<number of retries>",
  "_id": "<documentId>",

  "body": {
    "field_to_update1": "new value",
    "field_to_update2": "new value",
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
  "controller": "document",
  "action": "update",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",
    "_version": "<number>",// The new version number of this document
    "created": false
  }
}
```

Only documents in the persistent data storage layer can be updated.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document indexation (indexed documents are available for `search`).

Conflicts may occur if the same document gets updated multiple times within a short time on a database cluster. When this happens, Kuzzle answers with an error that clients have to handle.  
You may set the `retryOnConflict` optional argument with a positive integer, asking Kuzzle to retry updating the document that number of times before rejecting the request with an error.
